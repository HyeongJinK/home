var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('wiki', { title: 'Express' });
});

router.get('/list', function (req, res, next) {
  let db = new sqlite3.Database('db/wiki.db');

  db.all("SELECT * FROM wikis", (err, rows) => {
    res.send({"wikis": rows});
  });
});

router.get(':wikiTile', function(req, res, next) {
  let db = new sqlite3.Database('db/wiki.db');
});

module.exports = router;
