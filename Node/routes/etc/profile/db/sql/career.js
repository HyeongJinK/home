exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        checkList`
    , findByIdx: `
    SELECT
        *
    FROM
        checkList
    WHERE
        idx = ?`
    , save: `
    INSERT INTO checkList
        (taskIdx, title)
        VALUES (?, ?)`
    , update: `
    UPDATE
        checkList
    SET
        title = ?
    WHERE
        idx = ?`
    , delete: `
    DELETE
    FROM
        checkList
    WHERE
        idx = ?`
}
