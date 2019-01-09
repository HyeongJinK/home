var sqlite3 = require('sqlite3').verbose();

const bookDBPath = 'db/books.db';


exports.findByAll = (data, callBack) => {
    let db = new sqlite3.Database(bookDBPath);
    db.all("SELECT * FROM boardContent ORDER BY idx DESC LIMIT ?, ?", data, function(err, rows) {
        if (err)
        console.log(err);
        callBack(rows);
    });
    db.close();
}

exports.findbyBoardIdx = (data, callBack) => {
    let db = new sqlite3.Database(bookDBPath);
    db.all("SELECT * FROM boardContent WHERE boardIdx = ? ORDER BY idx DESC LIMIT ?, ?"
    , data
    , (err, rows) => {
        callBack(err, rows);
    }); 
    db.close();
}

exports.findByIdx = function(idx, callBack) {
    let db = new sqlite3.Database(bookDBPath);
    db.get("SELECT * FROM boardContent WHERE idx = ?", [idx], (err, row) => {
        callBack(row);
    });
    db.close();
}

exports.save = function(data, callBack) {
    let db = new sqlite3.Database(bookDBPath);
    db.run("INSERT INTO boardContent (boardIdx, title, content, createDate, modifyDate, hidden) VALUES (?,?,?,?,?,?)", data, function(err) {
        callBack(err);
    }); 
    db.close();
}

exports.update = function(data, callBack) {
    let db = new sqlite3.Database(bookDBPath);
    db.run("UPDATE boardContent SET title = ?, content = ?, modifyDate = ? where idx = ?", data, (err) => {
        callBack(err);
    });
    db.close();
} 

exports.delete = function(idx, callBack) {
    let db = new sqlite3.Database(bookDBPath);
    db.run("DELETE FROM boardContent WHERE idx = ?" [idx], (err) => {
        callBack(err);
    });
    db.close();
}