const sql_project = require('./sql/project').sql;
const sql_version = require('./sql/version').sql;
const sql_task = require('./sql/task').sql;
const sql_checkList = require('./sql/checkList').sql;
const sql_checkListColum = require('./sql/checkListColum').sql;
const sql_type = require('./sql/type').sql;
const sql_status = require('./sql/status').sql;
const sql_priority = require('./sql/priority').sql;

function returnDataFunc(data, sql, resultStr) {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data[resultStr+"Param"]
            , (err, result) => {
                data[resultStr] = result
                resolve(data);
        });
    });
}

function returnOneDataFunc(data, sql, resultStr) {
    return new Promise((resolve, reject) => {
        data.db.get(sql
            , data[resultStr+"Param"]
            , (err, result) => {
                data[resultStr] = result
                resolve(data);
        });
    });
}

function notReturnDataFunc(data, sql, resultStr) {
    return new Promise((resolve, reject) => {
        data.db.run(sql
            , data[resultStr+"Param"]
            , (err) => {
                if (this.lastID)
                    data["lastID"] = this.lastID;
                resolve(data);
        });
    });
}

exports.projectService = {
    findByAll: (data) => {
        return returnDataFunc(data, sql_project.findByAll, "findByAll");
    },
    findByIdx: (data) => {
        return returnOneDataFunc(data, sql_project.findByIdx, "findByIdx");
    },
    save: (data) => {
        return notReturnDataFunc(data, sql_project.save, "save");
    },
    update: (data) => {
        return notReturnDataFunc(data, sql_project.update, "update");
    },
    delete: (data) => {
        return notReturnDataFunc(data, sql_project.delete, "delete");
    }
}

exports.versionService = {
    findByAll: (data) => {
        return returnDataFunc(data, sql_version.findByAll, "findByAll");
    },
    findByIdx: (data) => {
        return returnOneDataFunc(data, sql_version.findByIdx, "findByIdx");
    },
    findByProjectIdx: (data) => {
        return returnDataFunc(data, sql_version.findByProjectIdx, "findByProjectIdx");
    },
    save: (data) => {
        return notReturnDataFunc(data, sql_version.save, "save");
    },
    update: (data) => {
        return notReturnDataFunc(data, sql_version.update, "update");
    },
    delete: (data) => {
        return notReturnDataFunc(data, sql_version.delete, "delete");
    }
}

exports.taskService = {
    findByAll: (data) => {
        return returnDataFunc(data, sql_task.findByAll, "findByAll");
    },
    findByIdx: (data) => {
        return returnOneDataFunc(data, sql_task.findByIdx, "findByIdx");
    },
    count: (data) => {
        return returnOneDataFunc(data, sql_task.count, "count");
    },
    save: (data) => {
        return notReturnDataFunc(data, sql_task.save, "save");
    },
    update: (data) => {
        return notReturnDataFunc(data, sql_task.update, "update");
    },
    delete: (data) => {
        return notReturnDataFunc(data, sql_task.delete, "delete");
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