exports.returnDataFunc = (data, sql, resultStr) => {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data[resultStr+"Param"]
            , (err, result) => {
                console.log(err)
                console.log("result = "+result)
                data[resultStr] = result
                resolve(data);
        });
    });
}

exports.returnOneDataFunc = (data, sql, resultStr) => {
    return new Promise((resolve, reject) => {
        data.db.get(sql
            , data[resultStr+"Param"]
            , (err, result) => {
                data[resultStr] = result
                resolve(data);
        });
    });
}

exports.notReturnDataFunc = (data, sql, resultStr) => {
    return new Promise((resolve, reject) => {
        data.db.run(sql
            , data[resultStr+"Param"]
            , (err) => {
                if (this.lastID)
                    data["lastID"] = this.lastID;
                resolve(data);
        });
    });
}