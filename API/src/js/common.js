const sqlite3 = require('sqlite3').verbose();
const _ = require('lodash');
const config = require("../config.json");
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

exports.config = finalConfig

exports.dbTemplate = function (func) {
    let db = new sqlite3.Database(finalConfig.db.book);
    func(db)
    db.close();
}

exports.dbRun = function (path, func) {
    let db = new sqlite3.Database(path);
    func(db);
    db.close();
}

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/user/login");
    }
}