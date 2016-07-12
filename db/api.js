var knex = require('./knex');

module.exports = {
  getBook: function(body){
    return knex('book').select();
  }
};
