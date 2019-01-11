const query = require('./module/query');
const down = require('./module/down');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let router = express.Router();

console.info("Pack - Down Route...")

router.get('/', function(req, res, next) {
    res.render('pack/down', { menu: ['PackPub', '스크래핑'] });
  });

router.get('/newisbn', function (req, res, next) {
    let isbnNum = req.query.isbnNum
    if (isbnNum == undefined) { isbnNum = 200 }
    let db = new sqlite3.Database(bookDBPath);
    let isbnArr = down.getIsbn(isbnNum)
    
    query.insertBookIsbn(db, isbnArr);
    res.send({"isbn" : isbnArr});
    db.close();
});
  
router.get('/getNullTitle', function (req, res, next) {
    
});

router.get('/test', function (req, res, next) {
    console.log(down.downBookContent().length)
    //console.log(down.downBookContent()[0])
});

module.exports = router;