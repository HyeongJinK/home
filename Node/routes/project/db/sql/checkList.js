exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            checkList
        ORDER BY idx DESC`
    , findByTaskIdx: `
        SELECT
            clc.*
        FROM
            checkList AS cl
        LEFT JOIN
            checkListColum AS clc
        ON cl.idx = clc.checkListIdx
        WHERE
            cl.taskIdx = 1`
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
