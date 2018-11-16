exports.save = function(db, callBack) {
    db.run("INSERT INTO board (boardIdx, title, content, createDate, modifyDate, hidden) VALUES (?,?,?,?,?,?)", data, function(err) {
        callBack(err);
    }); 
};