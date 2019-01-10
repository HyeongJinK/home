const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const bookDBPath = 'db/books.db';

console.log("System DB Route...");

router.get('/', function(req, res, next) {
  res.render('system/db', {menu: ['관리', 'DB'] });
});

router.post('/sql', function(req, res, next) {
  let db = new sqlite3.Database(bookDBPath);
  let sql = req.body.sql;
  db.run(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    //console.log(rows)
    res.send({"sql" : sql, "err" : err, "result": rows});
  })
  db.close();
});

router.get("/db", function (req, res, next) {
  let db = new sqlite3.Database(bookDBPath);

  db.all("SELECT * FROM sqlite_master where type = 'table' order by name", (err, rows) => {
    if (err) {
      console.log(err);
    }
    //console.log(rows)
    res.send({"err" : err, "result": rows});
  })
  db.close();
});

router.get("/columns", function (req, res, next) {
  let db = new sqlite3.Database(bookDBPath);
  let tableName = req.query.tableName
  console.log(tableName)
  db.all("PRAGMA table_info("+tableName+")", [], (err, rows) => {
    if (err) {
      console.log(err);
    }
    //console.log(rows)
    res.send({"err" : err, "result": rows});
  })
  db.close();
});

module.exports = router;