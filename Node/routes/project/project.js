const common = require("../common.js");
const projectDB = require('./db/projectDB');


exports.ProjectController = {
    listView: (req, res) => {
        res.render("project/project/list", {menu : ["Project", "Project 목록"]});
    },
    list: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": []})
        .then(projectDB.projectService.findByAll)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.result, page: 1, total: 1, records: result.result.length});
        });
    },
    formView: (req, res) => {
        res.render("project/project/form", {menu : ["Project", ""]});
    },
    save: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [
            req.body.title,
            req.body.description,
            req.body.view_mode
        ]})
        .then(projectDB.projectService.save)
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: result.result});
        });
    },
    update: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [
            req.body.title,
            req.body.description,
            req.body.view_mode,
            req.body.idx
        ]})
        .then(projectDB.projectService.update)
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: req.body.idx});
        });
    },
    delete: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [req.body.idx]})
        .then(projectDB.projectService.delete)
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err});
        });
    },
    readView: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [req.params.idx]})
        .then(projectDB.projectService.findByIdx)
        .then(common.dbClose)
        .then((result) => {
            res.render("project/project/read", {menu : ["Project", ""], row: result.result});
        });
    },
}

exports.VersionController = {
    listView: (req, res) => {
        res.render("project/version/list", {menu : ["Project", "Version 목록"]})
    },
    list: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": []})
        .then(projectDB.versionService.findByAll)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.result, page: 1, total: 1, records: result.result.length});
        });
    },
    listByProjectIdx: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [req.params.projectIdx]})
        .then(projectDB.versionService.findByProjectIdx)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.result});
        });
    },
    formView: (req, res) => {
        res.render("project/version/form", {menu : ["Project", ""]});
    },
    save: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [
            req.body.projectIdx,
            req.body.title,
            req.body.description,
            req.body.start_date,
            req.body.finish_date
        ]})
        .then(projectDB.versionService.save)
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: result.result});
        });
    },
    update: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [
            req.body.projectIdx,
            req.body.title,
            req.body.description,
            req.body.start_date,
            req.body.finish_date,
            req.body.idx
        ]})
        .then(projectDB.versionService.update)
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: req.body.idx});
        });
    },
    delete: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [req.body.idx]})
        .then(projectDB.versionService.delete)
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err});
        });
    },
    readView: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [req.params.idx]})
        .then(projectDB.versionService.findByIdx)
        .then(common.dbClose)
        .then((result) => {
            res.render("project/version/read", {menu : ["Project", ""], row: result.result});
        });
    },
}

exports.TaskController = {
    listView: (req, res) => {
        res.render("project/task/list", {menu : ["프로젝트", "일감목록"]})
    },
    list: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": []})
        .then(projectDB.taskService.findByAll)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.result, page: 1, total: 1, records: result.result.length});
        })
    },
    formView: (req, res) => {
        res.render("project/task/form", {menu : ["Project", ""]});
    },
    save: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [
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
            req.body.versionIdx
        ]})
        .then(projectDB.taskService.save)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                //TODO 에러 처리
                console.log(result.err)
            } else {
                res.redirect("/project/task");
            }
            //res.send({result: result.err, idx: result.result});
        });
    },
    update: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [
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
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err, idx: req.body.idx});
        });
    },
    delete: (req, res) => {
        common.dbOpen({"path": common.config.db.project, "param": [req.body.idx]})
        .then(projectDB.taskService.delete)
        .then(common.dbClose)
        .then((result) => {
            res.send({result: result.err});
        });
    },
    readView: (req, res) => {
        let idx = req.params.idx;

        common.dbOpen({"path": common.config.db.project, "param": [idx]})
        .then(projectDB.taskService.findByIdx)
        .then(common.dbClose)
        .then((result) => {
            res.render("project/task/read", {menu : ["Project", ""], row: result.result});
        });
    },
}

exports.SettingController = {

}