exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            version
        ORDER BY idx DESC`
    , findByIdx: `
        SELECT
            *
        FROM
            version
        WHERE
            idx = ?`
    , save: `
        INSERT INTO task 
            (projectIdx, title, description, start_date, finish_date, create_date)
            VALUES (?,?,?,?,?,datetime('now','localtime'))`
    , update: `
        UPDATE
            version 
        SET 
            projectIdx = ?
            , title = ?
            , description = ?
            , start_date = ?
            , finish_date = ?
        WHERE
            idx = ?`
    , delete: `
        DELETE FROM 
            version 
        WHERE 
            idx = ?`
    , findByIdx: `
        SELECT
            *
        FROM
            version
        WHERE
            idx = ?`
}