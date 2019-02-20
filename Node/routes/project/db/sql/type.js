exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            type
        ORDER BY idx DESC`
    , findByIdx: `
        SELECT
            *
        FROM
            type
        WHERE
            idx = ?`
    , save: `
        INSERT INTO task 
            (name)
            VALUES (?)`
    , update: `
        UPDATE
            type 
        SET 
            name = ?
        WHERE
            idx = ?`
    , delete: `
        DELETE FROM 
            type 
        WHERE 
            idx = ?`
}