const sql_project = require('./sql/project').sql;
const sql_version = require('./sql/version').sql;
const sql_task = require('./sql/task').sql;
const sql_checkList = require('./sql/checkList').sql;
const sql_checkListColum = require('./sql/checkListColum').sql;
const sql_type = require('./sql/type').sql;
const sql_status = require('./sql/status').sql;
const sql_priority = require('./sql/priority').sql;

function returnDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data.param
            , (err, result) => {
                resolve({"db" : data.db, err, result});
        });
    });
}

function returnOneDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.get(sql
            , data.param
            , (err, result) => {
                resolve({"db" : data.db, err, result});
        });
    });
}

function notReturnDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.run(sql
            , data.param
            , (err) => {
                if (this.lastID)
                    resolve({"db" : data.db, err, result: this.lastID});
                else
                    resolve({"db" : data.db, err});
        });
    });
}

exports.projectService = {
    findByAll: (data) => {
        return returnDataFunc(data, sql_project.findByAll);
    },
    findByIdx: (data) => {
        return returnOneDataFunc(data, sql_project.findByIdx);
    },
    save: (data) => {
        return notReturnDataFunc(data, sql_project.save);
    },
    update: (data) => {
        return notReturnDataFunc(data, sql_project.update);
    },
    delete: (data) => {
        return notReturnDataFunc(data, sql_project.delete);
    }
}

exports.versionService = {
    findByAll: (data) => {
        return returnDataFunc(data, sql_version.findByAll);
    },
    findByIdx: (data) => {
        return returnOneDataFunc(data, sql_version.findByIdx);
    },
    findByProjectIdx: (data) => {
        return returnDataFunc(data, sql_version.findByProjectIdx);
    },
    save: (data) => {
        return notReturnDataFunc(data, sql_version.save);
    },
    update: (data) => {
        return notReturnDataFunc(data, sql_version.update);
    },
    delete: (data) => {
        return notReturnDataFunc(data, sql_version.delete);
    }
}

exports.taskService = {
    findByAll: (data) => {
        return returnDataFunc(data, sql_task.findByAll);
    },
    findByIdx: (data) => {
        return returnOneDataFunc(data, sql_task.findByIdx);
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