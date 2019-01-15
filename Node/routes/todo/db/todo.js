const common = require("../../common.js");
const query = require('./json/todo.json')[global.gConfig.dbType];


exports.findByAll = (data, callBack) => {
    common.dbRun(global.gConfig.db.todo, (db) => {
        db.all(query.findByAll
            , data
            , function(err, rows) {
                callBack(err, rows);
        });
    });
}

exports.findByIdx = (idx, callBack) => {
    common.dbRun(global.gConfig.db.todo, (db) => {
        db.get(query.findByIdx)
            , [idx]
            , (err, row) => {
                callBack(err, row);
            }
    });
}

exports.save = (data, callBack) => {
    common.dbRun(global.gConfig.db.todo, (db) => {
        db.run(query.save
            , data
            , (err) => {
                callBack(err);
            })
    })
}


exports.update = () => {}
exports.delete = () => {}
exports.checkFindByAll = () => {}
exports.checkSave = () => {}
exports.checkMod = () => {}
exports.checkDel = () => {}
