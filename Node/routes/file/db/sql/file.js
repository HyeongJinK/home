exports.sql = {
    findByAll: `
    SELECT
        *
    FROM
        file
    ORDER BY idx DESC`,
    save: `
    INSERT INTO file
            (taskIdx, title)
            VALUES (?, ?)`
}