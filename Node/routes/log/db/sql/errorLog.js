exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            errorLog
        ORDER BY idx DESC`
    , save: `
        INSERT INTO errorLog 
            (message, regDate, tag)
            VALUES (?, datetime('now','localtime'), ?)`
}