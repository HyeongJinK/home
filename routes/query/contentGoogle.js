exports.selectContentByIsbnAndContentIndex = function(db, callBack, isbn, save) {
    db.all("SELECT * FROM content WHERE isbn = ? AND contentIndex > ? order by contentIndex", [isbn, save], function(err, rows) {
        if (err)
        console.log(err);
        callBack(rows);
    }); 
}

exports.insertContentGoogle = function(db, data, callBack) {
    db.run("INSERT INTO contentGoogle (isbn, menuNum, contentIndex, title, content) VALUES (?, ?, ?, ?, ?)", data, (err) => {
        callBack(err);
    });
}