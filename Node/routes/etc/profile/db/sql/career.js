exports.sql = {
    findByAll : `
    SELECT
        parent.*
        , child.title as childTitle
        , child.description as childDescription
        , child.idx as childIdx
        , child.tableData as childTableData
        , child.orderNum as childOrderNum
    FROM
        (SELECT
            *
        FROM
            career
        WHERE
            parentIdx = 0) AS parent
    LEFT JOIN 
        (SELECT
            *
        FROM
            career
        WHERE
            parentIdx != 0) AS child
    ON parent.idx = child.parentIdx 
    ORDER BY parent.orderNum desc, child.orderNum desc`
    , findByIdx: `
    SELECT
        *
    FROM
        career
    WHERE
        idx = ?`
    , save: `
    INSERT INTO career
        (parentIdx, title, description, orderNum, tableData)
        VALUES (?, ?, ?, ?, ?)`
    , update: `
    UPDATE
        career
    SET
        title = ?
        , description = ?
        , orderNum = ?
        , tableData = ?
    WHERE
        idx = ?`
    , delete: `
    DELETE
    FROM
        career
    WHERE
        idx = ?`
}
