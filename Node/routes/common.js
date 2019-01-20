const sqlite3 = require('sqlite3').verbose();
const bookDBPath = global.gConfig.db.book;
exports.boardDBPath = global.gConfig.db.board;

exports.dbTemplate = (func) => {
    let db = new sqlite3.Database(bookDBPath);
    func(db)
    db.close();
}

exports.dbRun = (path, func) => {
    let db = new sqlite3.Database(path);
    func(db);
    db.close();
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/user/login");
    }
}