const translate = require('./translate');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

router.use('/translate', translate);

//CREATE TABLE `contentTranslate` ( `isbn` TEXT, `menuNum` TEXT, `contentIndex` INTEGER, `title` TEXT, `content` TEXT, PRIMARY KEY(`isbn`,`contentIndex`) )
const bookDBPath = 'db/books.db';

router.get('/', function(req, res, next) {
  res.render('pack/list', {});
});

router.get('/list', function(req, res, next) {
  let db = new sqlite3.Database(bookDBPath);
  
  let pageNum = req.query.pageNum;
  let rowNum = req.query.rowNum;
  let startNum = (pageNum - 1) * rowNum;
  let searchText = req.query.searchText;
  
  let sql = "SELECT * FROM book";
  let countSql = "SELECT count(*) as bookCount FROM book";
  let param = [];
  let countParam = [];
  if (searchText != "") {
    searchText = "%"+searchText+"%"
    sql += " WHERE title like ?";
    param.push(searchText);
    countSql += " WHERE title like ?";
    countParam.push(searchText);
  }
  sql += " ORDER BY publicationDate desc LIMIT ?, ?"
  param.push(startNum);
  param.push(rowNum);

  db.all(sql, param, function(err, rows) {
    db.get(countSql, countParam, (err, row) => {
      res.send({"books" : rows, "bookCount" : row.bookCount});
    });  
  });	 
  db.close();
});

/**
 * read 
 */
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

module.exports = router;
