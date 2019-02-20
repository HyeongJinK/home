exports.sql = {
    findByAll : `
    SELECT
        *
    FROM
        company
    ORDER BY orderNum desc`
    , findByIdx: `
    SELECT
        *
    FROM
        company
    WHERE
        idx = ?`
    , save: `
    INSERT INTO company
        (name, dept, postion, start_time, finish_time, orderNum)
        VALUES (?, ?)`
    , update: `
    UPDATE
        company
    SET
        title = ?
    WHERE
        idx = ?`
    , delete: `
    DELETE
    FROM
        company
    WHERE
        idx = ?`
}
