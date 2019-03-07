exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        journal
    ORDER BY idx DESC`
    , findByIdx: `
    SELECT
        *
    FROM
        journal
    WHERE
        idx = ?`
    , save: `
    INSERT INTO journal
        (description, createDate)
    VALUES
        (?,datetime('now','localtime'))`
    , update: `
    UPDATE
        journal
    SET
        description = ?
        
    WHERE
        idx = ?`
    , delete: `
    DELETE
    FROM
        journal
    WHERE
        idx = ?`
}
