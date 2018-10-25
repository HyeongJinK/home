var sqlite3 = require('sqlite3').verbose();

const bookDBPath = 'db/books.db';

let db = new sqlite3.Database(bookDBPath);
const translate = require('./translate');
const query = require('./query');
const papago = require('./papago');
const parser = require("./parser");

// query.selectContentByIsbnAndContentIndex(db, (content) => {
//     console.log(content);
// }, "9781849696968", 0)

query.selectBookReservationByFinish(db, (rows) => {
    rows.forEach(element => {
        query.selectContentByIsbnAndContentIndex(db, (contents) => {
            contents.forEach((content) => {
                parser.HtmlToWiki(content.content, (data) => {
                    console.log(data)
                });
            }); 
        }, element.isbn, /*element.save*/49)
    });
});

db.close();

/**
 * 
 * 
 */
// query.insertBookReservation(db, (err) => {
//     if (err)
//         console.log(err);
// }, [9781849696968, false, 0, 0]);