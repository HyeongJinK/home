const sql_career = require('./sql/career').sql;
const template = require('../../DBPromiseTemplate')


exports.CareerService = {
    findByAll: (data) => {
        return template.returnDataFunc(data, sql_career.findByAll, "findByAll");
    }
}