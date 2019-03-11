const contentDB = require('./ContentDB');
const showdown = require('showdown') 
const converter = new showdown.Converter();

function undefinedCheck(data, def) {
    if (data == undefined)
        return def;
    else
        return data;
}

exports.list = (req, res) => {    
    let start = req.query.start;
    let rows = req.query.rows;

    start = undefinedCheck(start, "0");
    rows = undefinedCheck(rows, "10");
    
    contentDB.findByAll([start, rows], (err, rows) => {
        if (err) {
            console.log(err);
        }

        res.send({"list" : rows});
    });
};

exports.listByboardIdx = (req, res) => {
    let boardIdx = req.query.boardIdx;
    let start = req.query.start;
    let rows = req.query.rows;

    boardIdx = undefinedCheck(boardIdx, "1");
    start = undefinedCheck(start, "0");
    rows = undefinedCheck(rows, "10");

    contentDB.findbyBoardIdx([boardIdx, start, rows], (err, rows) => {
        if (err) {
            console.log(err);
        }

        res.send({"list" : rows});
    });
}

exports.get = (req, res) => {
    let idx = req.query.idx;

    contentDB.findByIdx([idx], (err, row) => {
        row.content = converter.makeHtml(row.content);
        res.send({"row" : row});
    });
}

exports.save = (req, res) => {
    contentDB.save([1, req.body.title, req.body.content/*, Date()*/, 0]
    , (err, lastId) => {
        res.send({"result" : err, "idx" : savelastId});
    });
}

exports.update = (req, res) => {
    contentDB.update([req.body.title, req.body.content, req.body.idx]
        , (err) => {
        res.send({"result" : err, "idx" : req.body.idx});
    });
}

exports.delete = (req, res) => {
    let idx = req.body.idx;

    contentDB.delete(idx, (err) => {
        res.send({"result" : err});
    })
}