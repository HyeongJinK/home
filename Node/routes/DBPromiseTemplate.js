exports.returnDataFunc = (data, sql) => {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data.param
            , (err, result) => {
                resolve({"db" : data.db, err, result});
        });
    });
}

exports.returnOneDataFunc = (data, sql) => {
    return new Promise((resolve, reject) => {
        data.db.get(sql
            , data.param
            , (err, result) => {
                resolve({"db" : data.db, err, result});
        });
    });
}

exports.notReturnDataFunc = (data, sql) => {
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