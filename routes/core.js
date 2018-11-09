var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

const bookDBPath = 'db/books.db';

router.get('/', function(req, res, next) {
  res.render('core', {});
});

router.post('/sql', function(req, res, next) {
  let db = new sqlite3.Database(bookDBPath);
  let sql = req.body.sql;
  db.run(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows)
    res.send({"sql" : sql, "err" : err, "result": rows});
  })
  db.close();
});

module.exports = router;