const sqlite3 = require('sqlite3').verbose();
//설정파일 로드&설정
const _ = require('lodash');
const baseConfig = require("./config.json");
const defaultConfig = baseConfig.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = baseConfig[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

exports.config = finalConfig

exports.dbRun = (path, func) => {
    let db = new sqlite3.Database(path);
    func(db);
    db.close();
}

exports.dbOpen = (data) => {
    let db = new sqlite3.Database(data.path);
    data.db = db
    return new Promise((resolve, reject) => {
        resolve(data)
    });
}

exports.dbClose = (data) => {
    if (data.db)
        data.db.close();
    
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/user/login");
    }
}