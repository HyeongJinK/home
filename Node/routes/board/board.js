const showdown = require('showdown') 
const converter = new showdown.Converter();
const common = require("../common.js");
const boardDB = require('./db/board');
const boardContentDB = require('./db/boardContent');


exports.BoardController = {
    listView: (req, res) => {
        res.render("board/board/list", {menu : ["게시판", "게시판 목록"]});
    },
    formView: (req, res) => {
        res.render("board/board/form", {menu : ["게시판", "게시판 편집"]});
    },
    list: (req, res) => {

    },
    save: (req, res) => {

    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}

exports.BoardContentController = {
    listView: (req, res) => {
        res.render('board/content/list', {menu: ['게시판', '목록'] });
    },
    readView: (req, res) => {
        let idx = req.params.idx;
    
        boardContentDB.findByIdx([idx], (err, row) => {
            row.content = converter.makeHtml(row.content);
            res.render('board/content/read', {menu: ['게시판', '내용',], "row" : row }) 
        });
    },
    formView: (req, res) => {
        let idx = req.query.idx;
    
        if (idx == undefined) {
            idx = 0;
            res.render('board/content/form', {menu: ['게시판', '편집'], idx: idx , row: null})
        } else {
            boardContentDB.findByIdx(idx, (err, row) => {
                res.render('board/content/form', {menu: ['게시판', '편집'], idx: idx, row: row })
            });
        } 
    },
    save: (req, res) => { 
        boardContentDB.save([1, req.body.title, req.body.content/*, Date()*/, 0]
        , (err, lastId) => {
            res.send({"result" : err, "idx" : lastId});
        });
    },
    update: (req, res) => {
        boardContentDB.update([req.body.title, req.body.content, req.body.idx]
            , (err) => {
            res.send({"result" : err, "idx" : req.body.idx});
        });
    },
    delete: (req, res) => {
        let idx = req.body.idx;
    
        boardContentDB.delete(idx, (err) => {
            res.send({"result" : err});
        })
    },
    list: (req, res) => {
        let boardIdx = req.query.boardIdx;
        let start = req.query.start;
        let rows = req.query.rows;
    
        boardIdx = undefinedCheck(boardIdx, "1");
        start = undefinedCheck(start, "0");
        rows = undefinedCheck(rows, "10");
        
        boardContentDB.findbyBoardIdx([boardIdx, start, rows]
            , (err, rows) => {
            if (err) {
                console.log(err);
            }
    
            res.send({"list" : rows});
        });
    },
    read: (req, res) => {
        let idx = req.query.idx;
    
        boardContentDB.findByIdx([idx], (row) => {
            res.send({"row" : row});
        });
    }
}

function undefinedCheck(data, def) {
    if (data == undefined)
        return def;
    else
        return data;
}