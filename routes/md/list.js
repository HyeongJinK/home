var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

const mdPath = 'db/md.db';
const bookDBPath = 'db/books.db';

router.get('/', function(req, res, next) {
  res.render('md/list', {});
});

router.get('/list', function(req, res, next) {
  let db = new sqlite3.Database(mdPath);
  
  let pageNum = req.query.pageNum;
  let rowNum = req.query.rowNum;
  let startNum = (pageNum - 1) * rowNum;
  let searchText = req.query.searchText;
  
  let sql = "SELECT * FROM book_title";
  let countSql = "SELECT count(*) as bookCount FROM book_title";
  let param = [];
  let countParam = [];
  if (searchText != "") {
    searchText = "%"+searchText+"%"
    sql += " WHERE title like ?";
    param.push(searchText);
    countSql += " WHERE title like ?";
    countParam.push(searchText);
  }
  //sql += " ORDER BY publicationDate desc LIMIT ?, ?"
  param.push(startNum);
  param.push(rowNum);

  db.all(sql, param, function(err, rows) {
    db.get(countSql, countParam, (err, row) => {
      res.send({"books" : rows, "bookCount" : row.bookCount});
    });  
  });	 
  db.close();
});

router.get('/create/en/:isbn', function(req, res,next) {
    let isbn = req.params.isbn;
    let bookdb = new sqlite3.Database(bookDBPath);
    let mddb = new sqlite3.Database(mdPath);
    bookdb.all("SELECT * FROM content WHERE isbn = ? ORDER BY contentIndex", [req.params.isbn], function(err, rows) {
        console.log(rows);
        //TODO md로 파싱, db 저장
        res.send({"book_data" : rows})
    });
    bookdb.close();
});



module.exports = router;
