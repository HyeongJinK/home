exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            task
        ORDER BY idx DESC
        LIMIT ?, ?`
    , findByIdx: `
        SELECT
            *
        FROM
            task
        WHERE
            idx = ?`
    , count: `
        SELECT
            count(*) as total
        FROM
            task`
    , save: `
        INSERT INTO task 
            (parentIdx, projectIdx, title, description, type, status, start_time, finish_time, priority, manager, progress, versionIdx, create_date)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,datetime('now','localtime'))`
    , update: `
        UPDATE
            task 
        SET 
            parentIdx = ?
            , projectIdx = ?
            , title = ?
            , description = ?
            , type = ?
            , status = ?
            , start_time = ?
            , finish_time = ?
            , priority = ?
            , manager = ?
            , progress = ?
            , versionIdx = ?
        WHERE
            idx = ?`
    , delete: `
        DELETE FROM 
            task 
        WHERE 
            idx = ?`
}