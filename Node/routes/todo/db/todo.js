const common = require("../../common.js");
const query = require('./todo.json')[global.gConfig.dbType];


exports.findByAll = (data, callBack) => {
    common.dbTemplate((db) => {
        db.all(query.findByAll
            , data
            , function(err, rows) {
                callBack(err, rows);
        });
    });
}

exports.findByIdx = (idx, callBack) => {
    common.dbTemplate((db) => {
        db.get(query.findByIdx)
            , [idx]
            , (err, row) => {
                callBack(err, row);
            }
    });
}

exports.save = (data, callBack) => {
    common.dbTemplate((db) => {
        db.run(query.save
            , data
            , (err) => {
                callBack(err);
            })
    })
}
