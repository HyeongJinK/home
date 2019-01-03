exports.findByAll = (db, callBack) => {
    db.all("SELECT * FROM board", [], (err, rows) => {
        callBack(rows);
    });
};

exports.save = (db, callBack) => {
    db.run("INSERT INTO board (boardIdx, title, content, createDate, modifyDate, hidden) VALUES (?,?,?,?,?,?)"
    , data
    , (err) => {
        callBack(err);
    }); 
};

exports.delete = (db, boardIdx, callBack) => {
    db.run("DELETE FROM board WHERE boardIdx = ?"
    , [boardIdx]
    , (err) => {
        callBack(err);
    });
}