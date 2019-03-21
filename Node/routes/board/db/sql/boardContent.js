exports.sql = {
    findByAll : `SELECT * FROM boardContent ORDER BY idx DESC LIMIT ?, ?`
    , findbyBoardIdx: `
        SELECT
            bc.*
            , t.tag 
        FROM
            boardContent as bc
        LEFT JOIN
            (
                SELECT
                    t.boardContentIdx
                    , group_concat(t.tag) as tag
                FROM
                    tag as t
                GROUP BY t.boardContentIdx
            ) as t
        ON bc.idx = t.boardContentIdx
        WHERE
            boardIdx = ? 
        ORDER BY idx DESC 
        LIMIT ?, ?`
    , findbyText: `select * from boardContent where title like %?% or content like %?% order by idx desc limit ?, ?`
    , countByBoardIdx: `SELECT count(*) as total FROM boardContent WHERE boardIdx = ?`
    , findByIdx: `
        SELECT
            bc.*
            , t.tag
        FROM
            boardContent as bc
        LEFT JOIN
            (
                SELECT
                    t.boardContentIdx
                    , group_concat(t.tag) as tag
                FROM
                    tag as t
                GROUP BY t.boardContentIdx
            ) as t
        ON bc.idx = t.boardContentIdx
        WHERE
            bc.idx = ?
        `
    , save: `INSERT INTO boardContent (boardIdx, title, content, createDate, hidden) VALUES (?,?,?,datetime('now','localtime'),?)`
    , update: `UPDATE boardContent SET title = ?, content = ?, modifyDate = datetime('now','localtime') where idx = ?`
    , delete: `DELETE FROM boardContent WHERE idx = ?`
}
