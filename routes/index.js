var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

  });
  router.get('/add', function(req, res, next){
    res.render('add');
  });

router.get('/book', function(req, res, next){
  knex('book').select().then(function(data){
    res.render('book', { title: 'Readz', list: data });
  });
});
router.post('/add', function(req, res, next){
  knex('book').insert(req.body).then(function(data){
    res.redirect('/book');
  }).catch(function (err){
      next(err);
  });
});
router.get('/:id/edit', function(req, res, next){
  knex('book').select().where({
    id: req.params.id
  }).then(function(data){
    res.render('edit', {item: data});
  });
});

router.get('/:id/delete', function(req, res, next){
  knex('book').delete(req.body).where({
    id: req.params.id
  }).then(function(data){
    res.redirect('/');
  });
});
router.post('/:id/edit', function(req, res, next){
  knex('book').update(req.body)
  .where({
    id: req.params.id
  }).then(function(data){
    res.redirect('/book');
  });
});
router.get('/:id/detail', function(req, res, next){
  knex('book').select().where({
    id: req.params.id
  }).then(function(data){
    res.render('detail', {item:data});
  });
});


//begin author routes
router.get('/addauthor', function(req, res, next){
  res.render('addauthor');
});
router.post('/addauthor', function(req, res, next){
  knex('author').insert(req.body).then(function(data){
    res.redirect('/author');
  }).catch(function (err){
      next(err);
  });
});
router.get('/author', function(req, res, next){
  knex('author').select().then(function(data){
    res.render('author', { title: 'Readz', list: data });
  });
});
router.post('/add', function(req, res, next){
  console.log(req.body);
  knex('author').insert(req.body).then(function(data){
    res.redirect('/author');
  }).catch(function (err){
      next(err);
  });
});
router.get('/:id/edit', function(req, res, next){
  knex('author').select().where({
    id: req.params.id
  }).then(function(data){
    res.render('edit', {item: data});
  });
});

router.get('/:id/delete', function(req, res, next){
  knex('author').delete(req.body).where({
    id: req.params.id
  }).then(function(data){
    res.redirect('/');
  });
});
router.post('/:id/edit', function(req, res, next){
  knex('author').update(req.body)
  .where({
    id: req.params.id
  }).then(function(data){
    res.redirect('/author');
  });
});
router.get('/:id/detail', function(req, res, next){
  knex('author').select().where({
    id: req.params.id
  }).then(function(data){
    res.render('detail', {item:data});
  });
});
module.exports = router;
