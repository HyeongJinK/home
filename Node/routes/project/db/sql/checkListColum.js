exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            checkListColum`
    , findByTaskIdx: `
        SELECT
            *
        FROM
            checkListColum
        WHERE
            taskIdx = ?`
    , save: `
        INSERT INTO checkListColum
            (taskIdx, title)
            VALUES (?, ?)`
    , update: `
        UPDATE
            checkListColum
        SET
            title = ?
        WHERE
            idx = ?`
    , delete: `
        DELETE
        FROM
            checkListColum
        WHERE
            idx = ?`
}
