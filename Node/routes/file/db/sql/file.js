exports.sql = {
    findByAll: `
    SELECT
        *
    FROM
        file
    ORDER BY idx DESC`,
    count:`
    SELECT
        count(*)
    FROM
        file`,
    save: `
    INSERT INTO file
        (originalName, fileName, description, extension, size)
    VALUES
        (?, ?, ?, ?, ?)`
}