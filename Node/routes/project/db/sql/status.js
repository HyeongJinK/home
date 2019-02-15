exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        status
    ORDER BY idx DESC`
    , findByIdx: `
    SELECT
        *
    FROM
        status
    WHERE
        idx = ?`
    , save: `
    INSERT INTO status 
        (name)
        VALUES (?)`
    , update: `
    UPDATE
        status 
    SET 
        name = ?
    WHERE
        idx = ?`
    , delete: `
    DELETE FROM 
        status 
    WHERE 
        idx = ?`
}