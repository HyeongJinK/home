const sql_project = require('./sql/project').sql;
const sql_version = require('./sql/version').sql;
const sql_task = require('./sql/task').sql;
const sql_checkList = require('./sql/checkList').sql;
const sql_checkListColum = require('./sql/checkListColum').sql;
const sql_type = require('./sql/type').sql;
const sql_status = require('./sql/status').sql;
const sql_priority = require('./sql/priority').sql;
const db_template = require('../../db/template')

exports.projectService = {
    findByAll: (data) => {
        return db_template.returnDataFunc(data, sql_project.findByAll, "projects");
    },
    findByIdx: (data) => {
        return db_template.returnOneDataFunc(data, sql_project.findByIdx, "findByIdx");
    },
    save: (data) => {
        return db_template.notReturnDataFunc(data, sql_project.save, "save");
    },
    update: (data) => {
        return db_template.notReturnDataFunc(data, sql_project.update, "update");
    },
    delete: (data) => {
        return db_template.notReturnDataFunc(data, sql_project.delete, "delete");
    }
}

exports.versionService = {
    findByAll: (data) => {
        return db_template.returnDataFunc(data, sql_version.findByAll, "versions");
    },
    findByIdx: (data) => {
        return db_template.returnOneDataFunc(data, sql_version.findByIdx, "findByIdx");
    },
    findByProjectIdx: (data) => {
        return db_template.returnDataFunc(data, sql_version.findByProjectIdx, "versions");
    },
    save: (data) => {
        return db_template.notReturnDataFunc(data, sql_version.save, "save");
    },
    update: (data) => {
        return db_template.notReturnDataFunc(data, sql_version.update, "update");
    },
    delete: (data) => {
        return db_template.notReturnDataFunc(data, sql_version.delete, "delete");
    }
}

let taskService = {
    findByAll: (data) => {
        return db_template.returnDataFunc(data, sql_task.findByAll, "tasks");
    },
    findByIdx: (data) => {
        return db_template.returnOneDataFunc(data, sql_task.findByIdx, "findByIdx");
    },
    count: (data) => {
        return db_template.returnOneDataFunc(data, sql_task.count, "count");
    },
    findByVersionIdx: (data) => {
        return db_template.returnDataFunc(data, sql_task.findByVersionIdx, "findByVersionIdx");
    },
    findByIdxParamParentIdx: (data) => {
        data["findByIdxParamParentIdxParam"] = [data.saveParam[0]]
        return db_template.returnOneDataFunc(data, sql_task.findByIdxParamParentIdx, "findByIdxParamParentIdx");
    },
    countByVersionIdx: (data) => {
        return db_template.returnOneDataFunc(data, sql_task.countByVersionIdx, "countByVersionIdx");
    },
    save: (data) => {
        if (data.saveParam[0] === '0') {//부모가 없을 경우
            return db_template.notReturnDataFunc(data, sql_task.save, "save")
                .then(taskService.updateParentIdx);
        } else {
            data["findByIdxParamParentIdxParam"] = [data.saveParam[0]]
            return db_template.returnOneDataFunc(data, sql_task.findByIdxParamParentIdx, "findByIdxParamParentIdx")
                .then(taskService.updateGroupOrd)
                .then((data) => {
                    return new Promise((resolve, reject) => {
                        data.saveParam[1] = data.findByIdxParamParentIdx.groupOrd + 1
                        data.saveParam[2] = data.findByIdxParamParentIdx.depth + 1
                        resolve(data);
                    });
                }).then((data) => {
                    return db_template.notReturnDataFunc(data, sql_task.save, "save")
                });
        }
    },
    update: (data) => {
        return db_template.notReturnDataFunc(data, sql_task.update, "update");
    },
    updateParentIdx: (data) => {
        data["updateParentIdxParam"] = [data.savelastID, data.savelastID]
        return db_template.notReturnDataFunc(data, sql_task.updateParentIdx, "updateParentIdx");
    },
    updateGroupOrd: (data) => {
        data["updateGroupOrdParam"] = [data.saveParam[0], data.findByIdxParamParentIdx.groupOrd];
        return db_template.notReturnDataFunc(data, sql_task.updateGroupOrd, "updateGroupOrd");
    },
    delete: (data) => {
        return db_template.notReturnDataFunc(data, sql_task.delete, "delete");
    },
};
exports.taskService = taskService;

exports.settingService= {
    getStatus: (data) => {
        return db_template.returnDataFunc(data, sql_status.findByAll, "status");
    },
    getType: (data) => {
        return db_template.returnDataFunc(data, sql_type.findByAll, "type");
    },
    getPriority: (data) => {
        return db_template.returnDataFunc(data, sql_priority.findByAll, "policy")
    },
}











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