const connect = require("../../db/connect.js");
const profileDB = require('./db/profileDB');

exports.view = (req, res, next) => {

    res.render("etc/profile", {menu : ["프로필", ""]});
}

exports.list = (req, res) => {
    connect.dbOpen({"path": connect.config.db.profile, "findByAllParam": []})
        .then(profileDB.CareerService.findByAll)
        .then(connect.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.findByAll});
        });
}