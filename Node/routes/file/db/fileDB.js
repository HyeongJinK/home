const sql_file = require("./sql/file").sql;
const db_template = require('../../DBPromiseTemplate')

exports.FileService = {
    findByAll: (data) => {
        return db_template.returnDataFunc(data, sql_file.findByAll, "files");
    },
    save: (data) => {
        return db_template.notReturnDataFunc(data, sql_file.save, "save");
    }
}