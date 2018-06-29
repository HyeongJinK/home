var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

var db = new sqlite3.Database('db/books.db');
var books;


console.log(db)
router.get('/', function(req, res, next) {
  res.render('pack/list', {});
});

router.get('/list', function(req,res, next) {
  db.all("SELECT * FROM book limit 0, 20", function(err, rows) {
    res.send({"books" : rows});
  });	
});

module.exports = router;
