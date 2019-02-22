exports.sql = {
    findByAll : `
    SELECT
        parent.*
        , child.title as childTitle
        , child.description as childDescription
        , child.parentIdx as childParentIdx
        , child.tableData as childTableData
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
    ON parent.idx = child.parentIdx `
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
