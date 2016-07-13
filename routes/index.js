var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

  });

router.get('/book', function(req, res, next){
  knex('book').select().then(function(data){
    res.render('book', { title: 'Readz', list: data });
  });
});
router.get('/add', function(req, res, next){
  res.render('add');
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
module.exports = router;
