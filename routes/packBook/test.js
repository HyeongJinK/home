var sqlite3 = require('sqlite3').verbose();

const bookDBPath = 'db/books.db';

let db = new sqlite3.Database(bookDBPath);
const translate = require('./translate');
const query = require('./query');
const papago = require('./papago');

query.selectBookByNotTranslate(db, (rows) => {
    rows.forEach(element => {
        query.selectContentByIsbnAndContentIndex(db, () => {}, element.isbn, 0)
        console.log(element.isbn)
    });
});



/**
 * 
 * 
 */
// query.insertBookReservation(db, (err) => {
//     if (err)
//         console.log(err);
// }, [9781849696968, false, 0, 0]);