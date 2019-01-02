exports.findByAll = (db, data, callBack) => {
    db.all("SELECT * FROM boardContent ORDER BY idx DESC LIMIT ?, ?", data, function(err, rows) {
        if (err)
        console.log(err);
        callBack(rows);
    }); 
}

exports.findbyBoardIdx = (db, data, callBack) => {
    db.all("SELECT * FROM boardContent WHERE boardIdx = ? ORDER BY idx DESC LIMIT ?, ?", data, function(err, rows) {
        if (err)
        console.log(err);
        callBack(rows);
    }); 
}

exports.findByIdx = function(db, idx, callBack) {
    db.get("SELECT * FROM boardContent WHERE idx = ?", [idx], (err, row) => {
        callBack(row);
    });
}

exports.save = function(db, data, callBack) {
    db.run("INSERT INTO boardContent (boardIdx, title, content, createDate, modifyDate, hidden) VALUES (?,?,?,?,?,?)", data, function(err) {
        callBack(err);
    }); 
}

exports.update = function(db, data, callBack) {
    db.run("UPDATE boardContent SET title = ?, content = ?, modifyDate = ? where idx = ?", data, (err) => {
        callBack(err);
    });
} 

exports.delete = function(db, idx, callBack) {
    db.run("DELETE FROM boardContent WHERE idx = ?" [idx], (err) => {
        callBack(err);
    });
}