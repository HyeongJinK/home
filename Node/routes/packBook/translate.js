const express = require('express');
const query = require('./module/query');
const contentGoogle = require('../query/contentGoogle');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const google = require('./module/google_before');

const bookDBPath = 'db/books.db';

router.get('/', function(req, res, next) {
    res.render('pack/list', {});
});

router.post('/add',(req, res, next) => {
    let isbn = req.body.isbn;
    let orderNum = 0
    if (req.body.orderNum != null) {
        orderNum = req.body.orderNum
    }
    if (isbn != null && isbn != "") {
        let db = new sqlite3.Database(bookDBPath);
        
        query.selectBookReservationByIsbn(db, isbn, (row) => {
            if (row == null) {
                query.selectBookByIsbn(db, isbn, (row) => {
                    if (row == null) {
                        db.close();
                        res.send({result: -1, message : "없는 책입니다."})
                    } else {
                        query.insertBookReservation(db, [isbn, 0, 0, orderNum], () => {
                            res.send({result: 0, message: "success"})
                        });
                        db.close();
                    }
                });    
            } else {
                db.close();
                res.send({result: -1, message : "이미 예약된 책입니다."})
            } 
        });
    } else {
        db.close();
        res.send({result: -1, message: "isbn 파라미터가 없습니다."})
    }
});

router.get('/del',(req, res, next) => {
    if (req.query.isbn != null) {
        let db = new sqlite3.Database(bookDBPath);
        
        query.deleteBookReservation(db, req.query.isbn, () => {
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

    query.selectBookReservationByAll(db, (rows) => {
        res.send({"book" : rows})
    });

    db.close();
});

router.get('/list_down', (req, res, next) => {
    let db =  new sqlite3.Database(bookDBPath);

    query.selectBookReservationByFinish(db, (rows) => {
        res.send({"book" : rows})
    });

    db.close();
});

router.get('/google', (req, res, next) => {
    let db = new sqlite3.Database(bookDBPath);
    query.selectContentByIsbnAndContentIndex(db, (contents) => {
        let i = 0;
        contents.forEach((content, i, arr) => {
            google.HtmlToWiki(content.content, (data) => {
                query.insertContentGoogle(db, [isbn, content.menuNum, content.contentIndex, content.title, data], ()=> {
                });                
            })
        }); 
    }, req.query.isbn, 0)
    res.send({"result" : "sucess"})
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

module.exports = router;