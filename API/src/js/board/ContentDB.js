const common = require("../common");
const query = require('./sql/Content.json')[common.config.dbType];


exports.findByAll = function (data, callBack) {
    common.dbRun(common.config.db.board, (db) => {
        db.all(query.findByAll
            , data
            , function(err, rows) {
            callBack(err, rows);
        });
    });
}

exports.findbyBoardIdx = (data, callBack) => {
    common.dbRun(common.config.db.board, (db) => {
        db.all(query.findbyBoardIdx
        , data
        , (err, rows) => {
            callBack(err, rows);
        }); 
    });
}

exports.countByBoardIdx = (boardIdx, callBack) => {
    common.dbRun(common.config.db.board, (db) => {
        db.get(query.countByBoardIdx
            , [idx]
            , (err, row) => {
            callBack(err, row);
        });
    });
}

exports.findByIdx = function(idx, callBack) {
    common.dbRun(common.config.db.board, (db) => {
        db.get(query.findByIdx
            , idx
            , (err, row) => {
            callBack(err, row);
        });
    });
}

exports.save = function(data, callBack) {
    common.dbRun(common.config.db.board, (db) => {
        db.run(query.save
        , data
        , function(err) {
            callBack(err, this.lastID);
        }); 
    });
}

exports.update = function(data, callBack) {
    common.dbRun(common.config.db.board, (db) => {
        db.run(query.update
        , data
        , (err) => {
            callBack(err);
        });
    });
} 

exports.delete = function(idx, callBack) {
    common.dbRun(common.config.db.board, (db) => {
        db.run(query.delete
        , [idx]
        , (err) => {
            callBack(err);
        });
    });
}