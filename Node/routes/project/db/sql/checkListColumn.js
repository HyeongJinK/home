exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            checkListColumn`
    , findByCheckListIdx: `
        SELECT
            *
        FROM
            checkListColumn
        WHERE
            checkListIdx = ?`
    , save: `
        INSERT INTO checkListColumn
            (checkListIdx, title, status)
            VALUES (?, ?, ?)`
    , update: `
        UPDATE
            checkListColumn
        SET
            title = ?
            , status = ?
        WHERE
            idx = ?`
    , delete: `
        DELETE
        FROM
            checkListColumn
        WHERE
            idx = ?`
    , deleteByCheckListIdx: `
        DELETE
        FROM
            checkListColumn
        WHERE
            checkListIdx = ?`
}
