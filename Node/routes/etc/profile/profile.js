const common = require("../../common.js");
const profileDB = require('./db/profileDB');

exports.view = (req, res, next) => {

    res.render("etc/profile", {menu : ["프로필", ""]});
}

exports.list = (req, res) => {
    common.dbOpen({"path": common.config.db.profile, "param": []})
        .then(profileDB.CareerService.findByAll)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }

            res.send({rows : result.result});
        });
}