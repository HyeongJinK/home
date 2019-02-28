var sqlite3 = require('sqlite3').verbose();
const bookDBPath = 'db/user.db';

exports.findByAll = (callBack) => {
    let db = new sqlite3.Database(bookDBPath);
    db.all("SELECT * FROM users", [], (err, rows) => {
        callBack(rows);
    });
    db.close();
};

exports.findById = (id, callBack) => {
    let db = new sqlite3.Database(bookDBPath);
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        callBack(err, row);
    });
    db.close();
}

exports.save = (data, callBack) => {
    let db = new sqlite3.Database(bookDBPath);
    db.run("INSERT INTO user (userIdx, id, password, createDate, nickname) VALUES (?,?,?,?)"
    , data
    , (err) => {
        callBack(err);
    }); 
    db.close();
};