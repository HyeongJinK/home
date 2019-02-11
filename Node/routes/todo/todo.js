const todoDB = require('./db/todo');

exports.list = (req, res) => {
    res.render("todo/list", {menu : ["TODO", "TODO 목록"]})
}

exports.todoForm = (req, res) => {
    res.render("todo/form", {menu : ["TODO", ""]});
}

exports.todoAdd = (req, res) => {
    todoDB.save([], (err) => {

    });
}

exports.todoMod = (req, res) => {
    todoDB.update([], (err) => {

    });
}

exports.todoDel = (req, res) => {
    let idx = req.body.idx;

    todoDB.delete(idx, (err) => {
        res.send({"result" : err});
    })
}

exports.todoRead = (req, res) => {
    res.render("todo/read", {menu : ["TODO", ""]});
}

exports.getList = (req, res) => {
    todoDB.findByAll([]
        , (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.send({"data" : rows});
        });
}

exports.typeAdd = (req, res) => {

}

exports.statusAdd = (req, res) => {
    
}