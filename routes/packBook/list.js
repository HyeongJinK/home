var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

//CREATE TABLE `contentTranslate` ( `isbn` TEXT, `menuNum` TEXT, `contentIndex` INTEGER, `title` TEXT, `content` TEXT, PRIMARY KEY(`isbn`,`contentIndex`) )
const bookDBPath = 'db/books.db';

router.get('/', function(req, res, next) {
  res.render('pack/list', {});
});

router.get('/list', function(req, res, next) {
  let db = new sqlite3.Database(bookDBPath);
  let pageNum = req.query.pageNum;
  let rowNum = req.query.rowNum;
  let searchText = req.query.searchText;
  let startNum = (pageNum - 1) * rowNum;
  //
  db.all("SELECT * FROM book WHERE title like '%?%' ORDER BY publicationDate desc LIMIT ?, ?", [searchText, startNum, rowNum],  function(err, rows) {
    db.get("SELECT count(*) as bookCount FROM book WHERE title like '%?%'", (err, row) => {
      res.send({"books" : rows, "bookCount" : row.bookCount});
    });  
  });	 
  db.close();
});

router.get('/:isbn', function(req, res,next) {
  res.render('pack/read', {"isbn" : req.params.isbn})
});

router.get('/list/:isbn', function(req, res,next) {
  let db = new sqlite3.Database(bookDBPath);
  db.all("SELECT * FROM content WHERE isbn = ? ORDER BY contentIndex", [req.params.isbn], function(err, rows) {
    res.send({"book_data" : rows})
  });
  db.close();
});

router.get('/translate/:isbn', (req, res, next) => {
  let db = new sqlite3.Database(bookDBPath);

  db.all("SELECT * FROM contentTranslate WHERE isbn = ? ORDER BY contentIndex"
  ,[req.params.isbn]
  , (err, rows) => {
    res.send({"book_translate" : rows});
  });

  db.close();
});

router.post('/translate/:isbn/:contentIndex', (req, res, next) => {
  let db = new sqlite3.Database(bookDBPath);

  db.run("INSERT INTO contentTranslate (isbn, menuNum, contentIndex, title, content) VALUES (?, ?, ?, ?, ?)"
  , [req.params.isbn
    , req.query.menuNum
    , req.params.contentIndex
    , req.query.title
    , req.query.content]
  , (err) => {
    if (err) {

    }

    res.send({"id" : this.lastID});
  });

  db.close();
});

module.exports = router;
