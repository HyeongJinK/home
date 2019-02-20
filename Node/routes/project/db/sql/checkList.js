exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            checkList`
    , findByTaskIdx: `
        SELECT
            *
        FROM
            checkList
        WHERE
            taskIdx = ?`
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
