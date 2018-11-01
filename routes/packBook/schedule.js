/**
 * https://www.npmjs.com/package/node-schedule
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

 */
const translate = require('./translate');
const query = require('./query');
const papago = require('./papago');
var schedule = require('node-schedule');
var sqlite3 = require('sqlite3').verbose();

const bookDBPath = 'db/books.db';

exports.translateSchedules = function() {
  schedule.scheduleJob('0 0 1 * * *', function() {
    translateSchedule(); 
  });
}

function translateSchedule() {
  let db = new sqlite3.Database(bookDBPath);
  let stop = 0;
  query.selectBookReservationByFinish(db, (rows) => {
      rows.forEach(element => {
          query.selectContentByIsbnAndContentIndex(db, (contents) => {
              contents.forEach((content, i, arr) => {
                  if (stop == 0) {
                      let replaceStr = papago.HtmlToWiki(content.content)
                      
                      if (replaceStr == -1) {
                          stop = 1
                          query.updateBookReservation(db, ["0", content.contentIndex - 1, content.isbn], () => {});
                          return
                      } else {
                          query.insertContentTranslate(db, [content.isbn, content.menuNum, content.contentIndex, content.title, replaceStr], ()=> {})
                          if (i == contents.length - 1) {
                              query.updateBookReservation(db, ["1", 999, element.isbn], () => {});
                          }
                      }
                  }
              }); 
          }, element.isbn, element.save)
      });
  });
  db.close();
}