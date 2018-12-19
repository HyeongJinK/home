const query = require('./module/query');
const down = require('./module/down');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let router = express.Router();

router.get('/newisbn', function (req, res, next) {
    let isbnNum = req.query.isbnNum
    if (isbnNum == undefined) { isbnNum = 200 }
    let db = new sqlite3.Database(bookDBPath);
    let isbnArr = down.getIsbn(isbnNum)
    
    query.insertBookIsbn(db, isbnArr);
    res.send({"isbn" : isbnArr});
    db.close();
});
  
router.get('/getNullTitle', function (res, res, next) {

});