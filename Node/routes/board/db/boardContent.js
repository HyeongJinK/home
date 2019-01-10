const common = require("../../common.js");
const query = require('./boardContent.json')[global.gConfig.dbType];


exports.findByAll = (data, callBack) => {
    common.dbTemplate((db) => {
        db.all(query.findByAll
            , data
            , function(err, rows) {
            callBack(err, rows);
        });
    });
}

exports.findbyBoardIdx = (data, callBack) => {
    common.dbTemplate((db) => {
        db.all(query.findbyBoardIdx
        , data
        , (err, rows) => {
            callBack(err, rows);
        }); 
    });
}

exports.countByBoardIdx = (boardIdx, callBack) => {
    common.dbTemplate((db) => {
        db.get(query.countByBoardIdx
            , [idx]
            , (err, row) => {
            callBack(err, row);
        });
    });
}

exports.findByIdx = function(idx, callBack) {
    common.dbTemplate((db) => {
        db.get(query.findByIdx
            , idx
            , (err, row) => {
            callBack(err, row);
        });
    });
}

exports.save = function(data, callBack) {
    common.dbTemplate((db) => {
        db.run(query.save
        , data
        , function(err) {
            callBack(err);
        }); 
    });
}

exports.update = function(data, callBack) {
    common.dbTemplate((db) => {
        db.run(query.update
        , data
        , (err) => {
            callBack(err);
        });
    });
} 

exports.delete = function(idx, callBack) {
    common.dbTemplate((db) => {
        db.run(query.delete
        , [idx]
        , (err) => {
            callBack(err);
        });
    });
}