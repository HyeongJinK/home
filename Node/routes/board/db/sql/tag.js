exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        tag
    ORDER BY idx DESC`
    , findByIdx: `
    SELECT
        *
    FROM
        tag
    WHERE
        idx = ?`
    , save: `
    INSERT INTO tag
        (boardContentIdx, tag)
    VALUES
        `
    , delete: `
    DELETE
    FROM
        tag
    WHERE
        boardContentIdx = ?`
}
