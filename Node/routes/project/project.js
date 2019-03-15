const connect = require("../db/connect.js");
const projectDB = require('./db/projectDB');
const showdown = require('showdown') 
const converter = new showdown.Converter();

function undefinedValueByDefaultValueEnter(data, def) {
    if (data == undefined)
        return def;
    else
        return data;
}

exports.ProjectController = {
    listView: (req, res) => {
        res.render("project/project/list", {menu : ["Project", "Project 목록"]});
    },
    list: (req, res) => {
        let page = req.query.page;
        let rows = req.query.rows;
         
        connect.dbOpen({"path": connect.config.db.project, "projectsParam": []})
        .then(projectDB.projectService.findByAll)
        .then(connect.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.projects, page: page, total: 1, records: result.projects.length});
        });
    },
    formView: (req, res) => {
        let idx = req.query.idx;
        if (idx) {
            connect.dbOpen({"path": connect.config.db.project, "findByIdxParam": [idx]})
            .then(projectDB.projectService.findByIdx)
            .then(connect.dbClose)
            .then((result) => {
                if (result.err) {
                    console.log(result.err);
                }
                res.render("project/project/form", {menu : ["프로젝트", "프로젝트 편집"], row: result.findByIdx});
            });
        } else {
            res.render("project/project/form", {menu : ["프로젝트", "프로젝트 편집"], row: null});
        }
    },
    save: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "saveParam": [
            req.body.title,
            req.body.description,
            req.body.view_mode
        ]})
        .then(projectDB.projectService.save)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: result.result});
        });
    },
    update: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "updateParam": [
            req.body.title,
            req.body.description,
            req.body.view_mode,
            req.body.idx
        ]})
        .then(projectDB.projectService.update)
        .then(connect.dbClose)
        .then((result) => {
            
            res.send({result: result.err, idx: req.body.idx});
        });
    },
    delete: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "deleteParam": [req.body.idx]})
        .then(projectDB.projectService.delete)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err});
        });
    },
    readView: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "findByIdxParam": [req.params.idx]})
        .then(projectDB.projectService.findByIdx)
        .then(connect.dbClose)
        .then((result) => {
            result.findByIdx.description = converter.makeHtml(result.findByIdx.description);
            res.render("project/project/read", {menu : ["Project", ""], row: result.findByIdx});
        });
    },
}

exports.VersionController = {
    listView: (req, res) => {
        res.render("project/version/list", {menu : ["Project", "Version 목록"]})
    },
    list: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "versionsParam": []})
        .then(projectDB.versionService.findByAll)
        .then(connect.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.versions, page: 1, total: 1, records: result.versions.length});
        });
    },
    listByProjectIdx: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "versionsParam": [req.query.projectIdx]})
        .then(projectDB.versionService.findByProjectIdx)
        .then(connect.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }
            res.send({rows : result.versions});
        });
    },
    formView: (req, res) => {
        let idx = req.query.idx;
        if (idx) {
            connect.dbOpen({"path": connect.config.db.project, "findByIdxParam": [idx]})
            .then(projectDB.versionService.findByIdx)
            .then(connect.dbClose)
            .then((result) => {
                if (result.err) {
                    console.log(result.err);
                }

                res.render("project/version/form", {menu : ["프로젝트", "버전 편집"], row: result.findByIdx});
            });
        } else {
            res.render("project/version/form", {menu : ["프로젝트", "버전 편집"], row: null});
        }
    },
    save: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "saveParam": [
            req.body.projectIdx,
            req.body.title,
            req.body.description,
            req.body.start_date,
            req.body.finish_date
        ]})
        .then(projectDB.versionService.save)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: result.result});
        });
    },
    update: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "updateParam": [
            req.body.projectIdx,
            req.body.title,
            req.body.description,
            req.body.start_date,
            req.body.finish_date,
            req.body.idx
        ]})
        .then(projectDB.versionService.update)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: req.body.idx});
        });
    },
    delete: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "deleteParam": [req.body.idx]})
        .then(projectDB.versionService.delete)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err});
        });
    },
    readView: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "findByIdxParam": [req.params.idx]})
        .then(projectDB.versionService.findByIdx)
        .then(connect.dbClose)
        .then((result) => {
            result.findByIdx.description = converter.makeHtml(result.findByIdx.description);
            res.render("project/version/read", {menu : ["Project", ""], row: result.findByIdx});
        });
    },
}

exports.TaskController = {
    listView: (req, res) => {
        res.render("project/task/list", {menu : ["프로젝트", "일감목록"]})
    },
    list: (req, res) => {
        let page = undefinedValueByDefaultValueEnter(req.query.page, 1);
        let rows = undefinedValueByDefaultValueEnter(req.query.rows, 10);
        let start = parseInt((page-1)*rows);
        let finish = parseInt(page*rows)
        connect.dbOpen({"path": connect.config.db.project, "tasksParam": [start, finish]})
        .then(projectDB.taskService.findByAll)
        .then(projectDB.taskService.count)
        .then(connect.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }
            res.send({rows : result.tasks, page: page, total: parseInt((result.count.total - 1) / rows) + 1, records: result.tasks.length});
        });
    },
    listByVersionIdx: (req, res) => {
        let page = undefinedValueByDefaultValueEnter(req.query.page, 1);
        let rows = undefinedValueByDefaultValueEnter(req.query.rows, 10);
        let versionidx = req.query.versionIdx
        let start = parseInt((page-1)*rows);
        let finish = parseInt(page*rows)
        connect.dbOpen({"path": connect.config.db.project
            , "findByVersionIdxParam": [versionidx, start, finish]
            , "countByVersionIdxParam": [versionidx]})
        .then(projectDB.taskService.findByVersionIdx)
        .then(projectDB.taskService.countByVersionIdx)
        .then(connect.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }
            res.send({rows : result.findByVersionIdx
                , page: page
                , total: parseInt((result.countByVersionIdx.total - 1) / rows) + 1
                , records: result.findByVersionIdx.length});
        });
    },
    formView: (req, res) => {
        let idx = req.query.idx;
        if (idx) {
            connect.dbOpen({"path": connect.config.db.project, "findByIdxParam": [idx]})
            .then(projectDB.taskService.findByIdx)
            .then(connect.dbClose)
            .then((result) => {
                if (result.err) {
                    console.log(result.err);
                }

                res.render("project/task/form", {menu : ["Project", "일감 편집"], row: result.findByIdx});
            });
        } else {
            res.render("project/task/form", {menu : ["Project", "일감 편집"], row: null});
        }
    },
    save: (req, res) => {
        //부모, 자식, 자식의 자식
        connect.dbOpen({"path": connect.config.db.project, "saveParam": [
            req.body.parentIdx,
            1,
            0,
            req.body.projectIdx,
            req.body.title,
            req.body.description,
            req.body.type,
            req.body.status,
            req.body.start_time,
            req.body.finish_time,
            req.body.priority,
            req.body.manager,
            req.body.progress,
            req.body.versionIdx
        ]})
        .then(projectDB.taskService.save)
        .then(connect.dbClose)
        .then((result) => {
            if (result.err) {
                //TODO 에러 처리
                console.log(result.err)
            } 
            res.send({result: result.err, idx: result.savelastID});
        });
    },
    update: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "updateParam": [
            req.body.parentIdx,
            req.body.projectIdx,
            req.body.title,
            req.body.description,
            req.body.type,
            req.body.status,
            req.body.start_time,
            req.body.finish_time,
            req.body.priority,
            req.body.manager,
            req.body.progress,
            req.body.versionIdx,
            req.body.idx
        ]})
        .then(projectDB.taskService.update)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: req.body.idx});
        });
    },
    delete: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "deleteParam": [req.body.idx]})
        .then(projectDB.taskService.delete)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err});
        });
    },
    readView: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "findByIdxParam": [req.params.idx]})
        .then(projectDB.taskService.findByIdx)
        .then(connect.dbClose)
        .then((result) => {
            result.findByIdx.description = converter.makeHtml(result.findByIdx.description);
            res.render("project/task/read", {menu : ["Project", ""], row: result.findByIdx});
        });
    },
}

exports.CheckListController = {
    listByTaskIdx: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "saveParam": [
            req.body.taskIdx
            , req.body.title
        ]})
        .then(projectDB.checkSerivce.findByTaskIdx)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: result.savelastID});
        })
    },
    save: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "saveParam": [
            req.body.taskIdx
            , req.body.title
        ]})
        .then(projectDB.checkSerivce.save)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: result.savelastID});
        })
    },
    update: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "updateParam": [
            req.body.title
            , req.body.idx
        ]})
        .then(projectDB.checkSerivce.update)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: req.body.idx});
        })
    },
    delete: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project
        , "deleteByCheckListIdxParam": [
            req.body.idx
        ]
        , "deleteParam": [
            req.body.idx
        ]})
        .then(projectDB.checkSerivce.deleteByCheckListIdx)
        .then(projectDB.checkSerivce.delete)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err});
        })
    }
}

exports.CheckListColumController = {
    save: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "saveColumnParam": [
            req.body.checkListIdx
            , req.body.title
            , req.body.status
        ]})
        .then(projectDB.checkSerivce.saveColumn)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: result.savelastID});
        })
    },
    update: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "updateColumnParam": [
            req.body.title
            , req.body.status
            , req.body.idx
        ]})
        .then(projectDB.checkSerivce.updateColumn)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: req.body.idx});
        })
    },
    delete: (req, res) => {
        connect.dbOpen({"path": connect.config.db.project, "deleteParam": [
            req.body.idx
        ]})
        .then(projectDB.checkSerivce.delete)
        .then(connect.dbClose)
        .then((result) => {
            res.send({result: result.err});
        })
    }
}

exports.SettingController = {

}