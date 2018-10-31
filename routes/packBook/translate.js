var express = require('express');
var query = require('./query');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

const bookDBPath = 'db/books.db';

module.exports = router;

router.get('/', function(req, res, next) {
    res.render('pack/list', {});
});

router.get('/add',(req, res, next) => {
    if (req.query.isbn != null) {
        let db = new sqlite3.Database(bookDBPath);
        let orderNum = 0
        if (req.query.orderNum != null) {
            orderNum = req.query.orderNum
        }
        query.insertBookReservation(db, [req.query.isbn, 0, 0, orderNum], () => {
            res.send({"result": 0})
        });
        db.close();
    } else {
        res.send({"result": 1})
    }
});

router.get('/list', (req, res, next) => {
    //번역본 리스트
    let db = new sqlite3.Database(bookDBPath);

    db.all("SELECT * FROM BookReservation", [], (err, rows) => {
        res.send({"book" : rows})
    });
    db.close();
});


//TODO 번역본 내용
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

/**
 * 다운
 */
router.get('/down', function(req, res, next) {
    res.render('pack/down', {});
});

