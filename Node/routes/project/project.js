const common = require("../common.js");
const projectDB = require('./db/projectDB');

exports.list = (req, res) => {
    res.render("project/task/list", {menu : ["Project", "Task 목록"]})
}

exports.taskForm = (req, res) => {
    res.render("project/task/form", {menu : ["Project", ""]});
}

exports.taskAdd = (req, res) => {
    projectDB.save([], (err) => {

    });
}

exports.taskMod = (req, res) => {
    projectDB.update([], (err) => {

    });
}

exports.taskDel = (req, res) => {
    let idx = req.body.idx;

    projectDB.delete(idx, (err) => {
        res.send({"result" : err});
    })
}

exports.taskRead = (req, res) => {
    res.render("project/task/read", {menu : ["Project", ""]});
}

exports.getList = (req, res) => {
    common.dbOpen({"path": common.config.db.project, "param": []})
        .then(projectDB.taskService.findByAll)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.result, page: 1, total: 1, records: result.result.length});
        })
}

exports.typeAdd = (req, res) => {

}

exports.statusAdd = (req, res) => {

}