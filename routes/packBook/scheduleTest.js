var sqlite3 = require('sqlite3').verbose();

const bookDBPath = '../../db/books.db';

let db = new sqlite3.Database(bookDBPath);

// db.all("SELECT * FROM bookReservation WHERE finish = true ORDER BY orderNum", [], function(err, rows) {
//     //TODO 예약된 책이 있을 경우 그 책부터 없을 경우 책 목록에서 가져오기
//     console.log(rows.length)
//     if (rows.length == 0) {
//       db.all("SELECT isbn FROM book WHERE isbn NOT IN (SELECT isbn FROM bookTranslate WHERE finish = 'true')", [], function(err, rows2) {
//           console.log(rows2.length)
//       });
//     } else {
//       rows.forEach(function(value, index, array) {
//         if (isbn.save == 0) { //처음부터 시작할 경우
//           db.all("SELECT * FROM content WHERE isbn = ? order by contentIndex", param, function(err, rows) {
//             rows.forEach(function(value, index, array) {
//                 //번역
//                 //insert
//                 value.content
//             });
//           });
//         } else {
//           db.all("SELECT * FROM content WHERE isbn = ? and contentIndex > "+value.save+" order by contentIndex", param, function(err, rows) {
//             rows.forEach(function(value, index, array) {
//             });
//           });
//         }
//       });
//     }
// });

insertTranslateContent()

function selectTest(callback) {
  db.all("SELECT * FROM bookReservation WHERE finish = true ORDER BY orderNum", [], function(err, rows) {
    console.log("adksjf3");
    callback(rows)
    return rows;
  });
}

function insertTranslateContent() {
  console.log("adksjf");
  let data = selectTest((e) => {console.log(e)})
  console.log(data)
  console.log("adksjf2");
}
db.close();