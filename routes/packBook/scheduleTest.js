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

exports.selctBookReservationAll = function(callback) {
  db.all("SELECT * FROM bookReservation WHERE finish = true ORDER BY orderNum", [], function(err, rows) {
    callback(rows)
  });
}

function selectBookAll(callBack) {
  db.all("SELECT * FROM book ORDER BY publicationDate", [], function(err, rows) {
    callback(rows)
  });
}

function select(callBack) {
  db.all("SELECT isbn FROM book WHERE isbn NOT IN (SELECT isbn FROM bookTranslate WHERE finish = 'true')", [], function(err, rows) {
    callback(rows)
  }); 
}

function selectContent(callBack, isbn, save) {
  db.all("SELECT * FROM content WHERE isbn = ? AND contentIndex > ? order by contentIndex)", [isbn, save], function(err, rows) {
    callback(rows)
  }); 
}


// rows.forEach(function(value, index, array) {
//   if (step != value.menuNum) {
//       step = value.menuNum;
//       summaryContent += "\n- ["+ value.title +"](/_draft/ch"+step+"/"+step+"_"+value.contentIndex+".md)"
//       createDir(draftPath+"/ch"+step);
//   } else {
//       summaryContent += "\n   - ["+ value.title +"](/_draft/ch"+step+"/"+step+"_"+value.contentIndex+".md)"
//   }
//   parser(value.content, draftPath, step, value.contentIndex); 
// });
function insertTranslateContent() {
  selctBookReservationAll((e) => {
    if (e.length != 0) {
      e.forEach(function(){
        selectContent((r) => {
          //TODO 번역 + 저장
        }, this.isbn, this. save);
      });
    }
  })
}
db.close();