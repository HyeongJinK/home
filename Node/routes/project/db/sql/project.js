exports.sql = {
    findByAll: `
    SELECT
        * 
    FROM
        project
    ORDER BY idx DESC`
    , save: `
    INSERT INTO task
        (title, description, view_mode)
        VALUES (?,?,?)`
    , update: `
    UPDATE
        project
    SET
        title = ?
        , description = ?
        , view_mode = ?
    WHERE
        idx = ?`
    , delete: `
    DELETE
    FROM
        project
    WHERE
        idx = ?`
    , findByIdx: `
    SELECT
        *
    FROM
        project
    WHERE
        idx = ?`
}