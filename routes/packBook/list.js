var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pack/list', {});
});

router.get('/list', function(req, res, next) {
  let db = new sqlite3.Database('db/books.db');
  let pageNum = req.query.pageNum
  let rowNum = 20;
  let searchText = "";
  let startNum = (pageNum - 1) * rowNum;
  db.all("SELECT * FROM book LIMIT ?, ?", [startNum, rowNum],  function(err, rows) {
    res.send({"books" : rows});
  });	
  db.close();
});

router.get('/:isbn', function(req, res,next) {
  let db = new sqlite3.Database('db/books.db');
  db.all("SELECT * FROM content WHERE isbn = ? ORDER BY contentIndex", [req.params.isbn], function(err, rows) {
    res.send({"book_data" : rows})
  });
  db.close();
});

module.exports = router;
