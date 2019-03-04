exports.sql = {
    findByAll : `SELECT * FROM boardContent ORDER BY idx DESC LIMIT ?, ?`
    , findbyBoardIdx: `SELECT * FROM boardContent WHERE boardIdx = ? ORDER BY idx DESC LIMIT ?, ?`
    , findbyText: `select * from boardContent where title like %?% or content like %?% order by idx desc limit ?, ?`
    , countByBoardIdx: `SELECT count(*) FROM boardContent WHERE idx = ?`
    , findByIdx: `SELECT * FROM boardContent WHERE idx = ?`
    , save: `INSERT INTO boardContent (boardIdx, title, content, createDate, hidden) VALUES (?,?,?,datetime('now','localtime'),?)`
    , update: `UPDATE boardContent SET title = ?, content = ?, modifyDate = datetime('now','localtime') where idx = ?`
    , delete: `DELETE FROM boardContent WHERE idx = ?`
}
