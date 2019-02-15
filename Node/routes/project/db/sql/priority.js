exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        priority
    ORDER BY idx DESC`
    , findByIdx: `
    SELECT
        *
    FROM
        priority
    WHERE
        idx = ?`
    , save: `
    INSERT INTO task 
        (name)
        VALUES (?)`
    , update: `
    UPDATE
        priority 
    SET 
        name = ?
    WHERE
        idx = ?`
    , delete: `
    DELETE FROM 
        priority 
    WHERE 
        idx = ?`
}