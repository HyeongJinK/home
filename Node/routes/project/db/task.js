const common = require("../../common.js");
const query = require('./json/task.json')[common.config.dbType];


exports.findByAll = (data) => {
    return new Promise((resolve, reject) => {
        data.db.all(query.findByAll
            , data.param
            , (err, rows) => {
                resolve({"db" : data.db, err, rows});
        });
    });
}

exports.findByIdx = (idx, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.get(query.findByIdx)
            , [idx]
            , (err, row) => {
                callBack(err, row);
            }
    });
}

exports.save = (data, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.run(query.save
            , data
            , (err) => {
                callBack(err);
            })
    });
}

exports.update = (data, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.run(query.update
            , data
            , (err) => {
                callBack(err);
            })
    });
}
exports.delete = (idx, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.run(query.delete
            , [idx]
            , (err) => {
                callBack(err);
            })
    });
}


/**
 * checkList
 */
exports.checkFindByAll = (data, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.all(query.checkFindByAll
            , data
            , (err, rows) => {
                callBack(err, rows);
            })
    });
}
exports.checkSave = (data, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.run(query.checkSave
            , data
            , (err) => {
                callBack(err);
            })
    });
}
exports.checkUpdate = (data, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.run(query.checkUpdate
            , data
            , (err) => {
                callBack(err);
            })
    });
}
exports.checkDel = (idx, callBack) => {
    common.dbRun(common.config.db.project, (db) => {
        db.run(query.checkDel
            , [idx]
            , (err) => {
                callBack(err);
            })
    });
}
