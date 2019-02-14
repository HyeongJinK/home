exports.sql = {
    findByAll: `SELECT
                    * 
                FROM
                    project
                ORDER BY idx DESC`
    , save: "INSERT INTO task (title, description, view_mode) VALUES (?,?,?)"
    , update: "UPDATE task SET title = ?, description = ? view_mode = ? WHERE idx = ?"
    , delete: ""
}