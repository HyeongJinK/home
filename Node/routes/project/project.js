const common = require("../common.js");
const taskDB = require('./db/task');

exports.list = (req, res) => {
    res.render("project/task/list", {menu : ["Project", "Task 목록"]})
}

exports.taskForm = (req, res) => {
    res.render("project/task/form", {menu : ["Project", ""]});
}

exports.taskAdd = (req, res) => {
    taskDB.save([], (err) => {

    });
}

exports.taskMod = (req, res) => {
    taskDB.update([], (err) => {

    });
}

exports.taskDel = (req, res) => {
    let idx = req.body.idx;

    taskDB.delete(idx, (err) => {
        res.send({"result" : err});
    })
}

exports.taskRead = (req, res) => {
    res.render("project/task/read", {menu : ["Project", ""]});
}

function test(err, rows) {
    console.log("err[] = " +err);
    console.log("rows = " +rows);
    if (err) {
        console.log(err);
    }
    //res.send({"data" : rows});
}

exports.getList = (req, res) => {
    common.dbOpen({"path": common.config.db.project, "param": []})
        .then(taskDB.findByAll)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }
            res.send({"data" : result.rows});
        })
}

exports.typeAdd = (req, res) => {

}

exports.statusAdd = (req, res) => {

}