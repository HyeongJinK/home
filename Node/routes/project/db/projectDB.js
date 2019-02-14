const common = require("../../common.js");
const sql_project = require('./sql/project').sql;
const sql_task = require('./sql/task').sql;
const sql_checkList = require('./sql/checkList').sql;

function returnDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data.param
            , (err, result) => {
                resolve({"db" : data.db, err, result});
        });
    });
}

function notReturnDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data.param
            , (err) => {
                resolve({"db" : data.db, err});
        });
    });
}

exports.taskService = {
    findByAll: function (data) {
        return returnDataFunc(data, sql_task.findByAll);
    },
    findByIdx: (data) => {
        return returnDataFunc(data, sql_task.findByIdx);
    },
    save: (data) => {
        return notReturnDataFunc(data, sql_task.save);
    },
    update: (data) => {
        return notReturnDataFunc(data, sql_task.update);
    },
    delete: (data) => {
        return notReturnDataFunc(data, sql_task.delete);
    },
};
/**
 * checkList
 */
// exports.checkService = {
//     findByAll: (data, callBack) => {
//         common.dbRun(common.config.db.project, (db) => {
//             db.all(sql_task.checkFindByAll
//                 , data
//                 , (err, rows) => {
//                     callBack(err, rows);
//                 })
//         });
//     },
//     save: (data, callBack) => {
//         common.dbRun(common.config.db.project, (db) => {
//             db.run(sql_task.checkSave
//                 , data
//                 , (err) => {
//                     callBack(err);
//                 })
//         });
//     },
//     update = (data, callBack) => {
//         common.dbRun(common.config.db.project, (db) => {
//             db.run(sql_task.checkUpdate
//                 , data
//                 , (err) => {
//                     callBack(err);
//                 })
//         });
//     },
//     delete: (idx, callBack) => {
//         common.dbRun(common.config.db.project, (db) => {
//             db.run(sql_task.checkDel
//                 , [idx]
//                 , (err) => {
//                     callBack(err);
//                 })
//         });
//     }
// }