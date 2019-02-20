//const profileDB = require('./db/profileDB');

exports.view = (req, res, next) => {
    res.render("etc/profile", {menu : ["프로필", ""]});
}