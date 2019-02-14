const common = require("../../common.js");
const sql_project = require('./sql/project').sql;
const sql_task = require('./sql/task').sql;
const sql_checkList = require('./sql/checkList').sql;

exports.taskService = {
    findByAll: function (data) {
        return new Promise((resolve, reject) => {
            data.db.all(sql_task.findByAll
                , data.param
                , (err, rows) => {
                    resolve({"db" : data.db, err, rows});
            });
        })
    },
    findByIdx: (data) => {
        return new Promise((resolve, reject) => {
            data.db.get(sql_task.findByIdx
                , data.param
                , (err, row) => {
                    resolve({"db" : data.db, err, row})
            });
        })
    },
    save: (data) => {
        return new Promise((resolve, reject) => {
            data.db.get(sql_task.save
                , data.param
                , (err) => {
                    resolve({"db" : data.db, err})
            });
        })
    },
    update: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.db.get(sql_task.update
                , data.param
                , (err) => {
                    resolve({"db" : data.db, err})
            });
        })
    },
    delete: (idx, callBack) => {
        return new Promise((resolve, reject) => {
            data.db.get(sql_task.delete
                , data.param
                , (err) => {
                    resolve({"db" : data.db, err})
            });
        })
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