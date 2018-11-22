var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var boardContent = require('../query/boardContent');
var router = express.Router();

const bookDBPath = 'db/books.db';

function template(callFun, req, res) {
    let db = new sqlite3.Database(bookDBPath);

    callFun(db);

    db.close();
}


router.get("/list", (req, res, next) => {
    template((db) => {
        let boardIdx = req.query.boardIdx;
        let start = req.query.start;
        let rows = req.query.rows;
        boardContent.findbyBoardIdx(db, [boardIdx, start, rows], (rows) => {
            res.send({"list" : rows});
        });
    })
});

router.get("/:idx", (req, res, next) => {
    template((db) => {
        let idx = req.query.idx;

        boardContent.findByIdx(db, [idx], (row) => {
            res.send({"row" : row});
        });
    });
});

router.post("/:idx", (req, res, next) => {

});

router.put("/:idx", (req, res, next) => {

});

router.delete("/:idx", (req, res, next) => {

});

module.exports = router;