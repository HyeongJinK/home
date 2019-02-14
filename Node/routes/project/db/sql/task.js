exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        task
    ORDER BY idx DESC`
    , findByIdx: `
    SELECT
        *
    FROM
        task
    WHERE
        idx = ?`
    , save: `
    INSERT INTO task 
        (parentIdx, title, content, status, startTime, finishTime)
        VALUES (?,?,?,?,?,?)`
    , update: `
    UPDATE
        task 
    SET 
        parentIdx = ?`
    , delete: `
    DELETE FROM 
        task 
    WHERE 
        idx = ?`
}