exports.sql = {
    findByAll : `
        SELECT
            *
        FROM
            checkList
        ORDER BY idx DESC`
    , findByTaskIdx: `
        SELECT
            cl.title as mainTitle
            ,cl.idx as mainIdx
            ,clc.idx as subIdx
            ,clc.title as subTitle
            , clc.status as status
        FROM
            checkList AS cl
        LEFT JOIN
            checkListColum AS clc
        ON cl.idx = clc.checkListIdx
        WHERE
            cl.taskIdx = ?`
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
