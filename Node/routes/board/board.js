var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var boardContent = require('./query/boardContent');
var router = express.Router();

const bookDBPath = 'db/books.db';

function template(callFun, req, res) {
    let db = new sqlite3.Database(bookDBPath);

    callFun(db);

    db.close();
}

router.get("/content/list", (req, res, next) => {
    res.render('board/content/list', {menu: ['게시판', '목록'] })  
});

router.get("/content/read", (req, res, next) => {
    res.render('board/content/read', {menu: ['게시판', '내용'] })  
});

router.get("/content/form", (req, res, next) => {
    res.render('board/content/form', {menu: ['게시판', '입력'] })  
});

router.get("/content/getList", (req, res, next) => {
    template((db) => {
        let boardIdx = req.query.boardIdx;
        let start = req.query.start;
        let rows = req.query.rows;
        boardContent.findbyBoardIdx(db, [boardIdx, start, rows], (rows) => {
            res.send({"list" : rows});
        });
    })
});

router.get("/content/:idx", (req, res, next) => {
    template((db) => {
        let idx = req.query.idx;

        boardContent.findByIdx(db, [idx], (row) => {
            res.send({"row" : row});
        });
    });
});

router.post("/content/:idx", (req, res, next) => {
    template((db) => {
        let idx = req.body.idx;

        boardContent.save(db
        , [idx, req.body.title, req.body.content, req.body.createDate, req.body.modifyDate, req.body.hidden]
        , (err) => {

        });
    });
});

router.put("/content/:idx", (req, res, next) => {
    template((db) => {
        boardContent.update(db
            , [req.body.title, req.body.content, req.body.modifyDate, req.body.idx]
            , (err) => {
                res.send({"result" : err});
        });
    });
});

router.delete("/content/:idx", (req, res, next) => {
    template((db) => {
        let idx = req.body.idx;

        boardContent.delete(db, idx, (err) => {
            res.send({"result" : err});
        })
    });
});

module.exports = router;