const sql_career = require('./sql/career').sql;

function returnDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data.param
            , (err, result) => {
                resolve({"db" : data.db, err, result});
        });
    });
}

function returnOneDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.get(sql
            , data.param
            , (err, result) => {
                resolve({"db" : data.db, err, result});
        });
    });
}

function notReturnDataFunc(data, sql) {
    return new Promise((resolve, reject) => {
        data.db.run(sql
            , data.param
            , (err) => {
                if (this.lastID)
                    resolve({"db" : data.db, err, result: this.lastID});
                else
                    resolve({"db" : data.db, err});
        });
    });
}

exports.CareerService = {
    findByAll: (data) => {
        return returnDataFunc(data, sql_career.findByAll);
    }
}