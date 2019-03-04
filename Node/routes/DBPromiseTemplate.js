exports.returnDataFunc = (data, sql, resultStr) => {
    return new Promise((resolve, reject) => {
        data.db.all(sql
            , data[resultStr+"Param"]
            , (err, result) => {
                if (err) 
                    data[err] = err
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
                if (err) 
                    data[err] = err
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
<<<<<<< HEAD
                if (err) 
                    data[err] = err
=======
                if (err)
                    console.log(err)
>>>>>>> aed5bd849b561be891fc88fdac9e33b14facc750
                if (this.lastID)
                    data["lastID"] = this.lastID;
                resolve(data);
        });
    });
}