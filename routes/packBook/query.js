exports.selectBookReservationByAll = function(db, callBack) {
  db.all("SELECT * FROM bookReservation ORDER BY idx", [], function(err, rows) {
    if(err)
      console.log(err);
    callBack(rows);
  });
}

exports.selectBookReservationByFinish = function(db, callBack) {
  db.all("SELECT * FROM bookReservation WHERE finish = 0 ORDER BY orderNum", [], function(err, rows) {
    callBack(rows)
  });
  
}

exports.selectBookByAll = function(db, callBack) {
  db.all("SELECT * FROM book ORDER BY publicationDate", [], function(err, rows) {
    if (err)
      console.log(err)
    callBack(rows);
  });
}

exports.selectBookByNotTranslate = function(db, callBack) {
  db.all("SELECT isbn FROM book WHERE isbn NOT IN (SELECT isbn FROM bookTranslate)", [], function(err, rows) {
    if (err)
      console.log(err)
    callBack(rows);
  }); 
}

exports.selectContentByIsbnAndContentIndex = function(db, callBack, isbn, save) {
  db.all("SELECT * FROM content WHERE isbn = ? AND contentIndex > ? order by contentIndex", [isbn, save], function(err, rows) {
    if (err)
      console.log(err);
    callBack(rows);
  }); 
}

exports.insertBookReservation = function(db, callBack, data) {
  db.run("INSERT INTO bookReservation (isbn, finish, save, orderNum) VALUES (?, ?, ?, ?)", data, function(err) {
    callBack(err);
  });
}

exports.insertBookTranslate = function(db, callBack, isbn) {
  db.run("INSERT INTO bookTranslate (isbn) VALUES (?)", [isbn], (err) => {
    callBack(err);
  });
}

exports.insertContentTranslate = function(db, callBack, data) {
  db.run("", [], (err) => {
    callBack(err);
  });
}



//exports.selectBookByNotTranslate((rows) => {console.log(rows)})


function insertTranslateContent() {
  selectBookReservationByAll((e) => {
    if (e.length != 0) {
      e.forEach(function(){
        selectContent((r) => {
          //TODO 번역 + 저장
        }, this.isbn, this. save);
      });
    }
  })
}
