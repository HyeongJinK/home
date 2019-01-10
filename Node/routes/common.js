const sqlite3 = require('sqlite3').verbose();
const bookDBPath = global.gConfig.db

exports.dbTemplate = (func) => {
    let db = new sqlite3.Database(bookDBPath);
    func(db)
    db.close();
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/user/login");
    }
}