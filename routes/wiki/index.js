const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let router = express.Router();
const dbName = 'db/wiki.db';

function dbQuery(run) {
  run();
}

router.get('/', function(req, res, next) {
  res.render('wiki', { title: 'Express' });
});

router.get('/list', function (req, res, next) {
  let db = new sqlite3.Database(dbName);

  db.all("SELECT * FROM wikis", (err, rows) => {
    res.send({"wikis": rows});
  });

  db.close();
});

router.get('/:wikiTitle/list'
  , function(req, res, next) {
  let db = new sqlite3.Database(dbName);

  db.all("SELECT * FROM wikidata WHERE wikiTitle = ?"
  , [req.params.wikiTitle]
  , (err, rows) => {
    res.send({"wikidatas" : rows});
  });

  db.close();
});

router.get('/:wikiTitle/:title', (req, res, next) => { 
  let db = new sqlite3.Database(dbName);

  db.get("SELECT * FROM wikidata WHERE wikiTitle = ? AND title = ?"
  , [req.params.wikiTitle, req.params.title]
  , (err, row) => {
    res.send({"wikidata" : row})
  })
  db.close();
});

router.post('/:wikiTitle/:title', (req, res, next) => {
  let db = new sqlite3.Database(dbName);

  db.run("INSERT INTO wikidata (wikiTitle, title, content, createDate) VALUES (?, ?, ?, ?)"
  , [req.params.wikiTitle
    , req.params.title
    , req.query.content
    , new Date()]
  , (err) => {
    if (err) {

    }

    res.send({"id" : this.lastID});
  });

  db.close();
});

router.put('/:wikiTitle/:title', (req, res, next) => {
  let db = new sqlite3.Database(dbName);

   db.run("UPDATE wikidata SET content = ?, modifyDate = ? WHERE wikiTitle = ? AND title = ?"
   , [req.query.content
    , new Data()
    , req.params.wikiTitle
    , req.params.title]
   , (err) => {
     res.send({"changes" : this.changes});
   });

  db.close();
});

router.delete('/:wikiTitle/:title', (req, res, next) => {
  let db = new sqlite3.Database(dbName);
  
  db.run("DELETE FROM wikidata WHERE wikiTitle = ? AND title = ?"
  , [req.params.wikiTitle
    , req.params.title]
  , (err) => {
    res.send({"changes" : this.changes});
  });

  db.close();
});

module.exports = router;
