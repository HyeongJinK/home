exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        board
    ORDER BY boardIdx`
    , findByIdx: `
    SELECT
        *
    FROM
        board
    WHERE
        boardIdx = ?`
    , save: `
    INSERT INTO board
        (title, hidden)
    VALUES
        (?,?)`
    , update: `
    UPDATE
        board
    SET
        title = ?
        , hidden = ?
    WHERE
        boardIdx = ?`
    , delete: `
    DELETE
    FROM
        board
    WHERE
        boardIdx = ?`
}
