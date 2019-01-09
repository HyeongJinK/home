var express = require('express');

var boardContent = require('./query/boardContent');
var router = express.Router();

console.log("Board Route...");

router.get("/content", (req, res) => {
    res.render('board/content/list', {menu: ['게시판', '목록'] })  
});

router.get("/content/read", (req, res) => {
    res.render('board/content/read', {menu: ['게시판', '내용'] })  
});

router.route("/content/form")
.get((req, res) => {
    res.render('board/content/form', {menu: ['게시판', '입력'] })  
}).post((req, res) => { 
    let idx = req.body.idx;

    boardContent.save([idx, req.body.title, req.body.content, req.body.createDate, req.body.modifyDate, req.body.hidden]
    , (err) => {

    });
}).put((req, res) => {
    boardContent.update([req.body.title, req.body.content, req.body.modifyDate, req.body.idx]
        , (err) => {
            res.send({"result" : err});
    });
}).delete((req, res) => {
    let idx = req.body.idx;

    boardContent.delete(idx, (err) => {
        res.send({"result" : err});
    })
});

function undefinedCheck(data, def) {
    if (data == undefined)
        return def;
    else
        return data;
}

router.get("/content/list", (req, res) => {
    let boardIdx = req.query.boardIdx;
    let start = req.query.start;
    let rows = req.query.rows;

    boardIdx = undefinedCheck(boardIdx, "0");
    start = undefinedCheck(start, "0");
    rows = undefinedCheck(rows, "10");
    
    boardContent.findbyBoardIdx([boardIdx, start, rows]
        , (err, rows) => {
        if (err) {
            console.log(err);
        }

        res.send({"list" : rows});
    });
});

router.get("/content/:idx", (req, res) => {
    let idx = req.query.idx;

    boardContent.findByIdx([idx], (row) => {
        res.send({"row" : row});
    });
});

module.exports = router;