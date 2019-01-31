exports.getList = function (req, res) {
    res.send({"result" : err, "rows" : []});
}

exports.save = function (req, res) {
    res.send({"result" : err, "lastId" : []});
}



// const sqlite3 = require('sqlite3').verbose();
// const boardQuery = require('./boardContent.json');

// const bookDBPath = global.gConfig.db

// exports.findByAll = (db, callBack) => {
//     db.all("SELECT * FROM board", [], (err, rows) => {
//         callBack(rows);
//     });
// };

// exports.save = (db, callBack) => {
//     db.run("INSERT INTO board (boardIdx, title, content, createDate, modifyDate, hidden) VALUES (?,?,?,CURRENT_TIMESTAMP,null,?)"
//     , data
//     , (err) => {
//         callBack(err);
//     }); 
// };

// exports.delete = (db, boardIdx, callBack) => {
//     db.run("DELETE FROM board WHERE boardIdx = ?"
//     , [boardIdx]
//     , (err) => {
//         callBack(err);
//     });
// }