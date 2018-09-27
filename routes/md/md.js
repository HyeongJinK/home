var express = require('express');
var cheerio = require("cheerio"); 
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

const mdPath = 'db/md.db';
const bookDBPath = 'db/books.db';

router.get('/', function(req, res, next) {
  res.render('md/list', {});
});

router.get('/list', function(req, res, next) {
  let db = new sqlite3.Database(mdPath);
  
  let pageNum = req.query.pageNum;
  let rowNum = req.query.rowNum;
  let startNum = (pageNum - 1) * rowNum;
  let searchText = req.query.searchText;
  
  let sql = "SELECT * FROM book_title";
  let countSql = "SELECT count(*) as bookCount FROM book_title";
  let param = [];
  let countParam = [];
  if (searchText != "") {
    searchText = "%"+searchText+"%"
    sql += " WHERE title like ?";
    param.push(searchText);
    countSql += " WHERE title like ?";
    countParam.push(searchText);
  }
  //sql += " ORDER BY publicationDate desc LIMIT ?, ?"
  param.push(startNum);
  param.push(rowNum);

  db.all(sql, param, function(err, rows) {
    db.get(countSql, countParam, (err, row) => {
      res.send({"books" : rows, "bookCount" : row.bookCount});
    });  
  });	 
  db.close();
});

function parser(h) {
  let temp = cheerio.load(h);

  temp("h2.title").prepend("# ");
  temp("h3.title").prepend("\n\n## ");
  temp("h4.title").prepend("\n\n### ");
  temp("h5.title").prepend("\n\n#### ");
  
  temp("pre.programlisting").prepend("\n\n```java\n").append("\n```");
  temp("strong").prepend("**").append("**");
  temp("img").each(function(i, elem) {
      temp(this).parent().prepend("\n\n![](" + temp(this).attr("src") + ")");
  });
  temp("code.literal").each(function(i, elem) {
      //temp(this).prepend("&lt;span style='color:red'&gt;").append("&lt;/span&gt;");
      temp(this).prepend("\`").append("\`");
  });
  temp("div.note p").prepend("> ");
  
  temp("p").prepend("\n\n")
  

  temp("ul").prepend("\n");
  temp("ol").prepend("\n");
  temp("ul").find("li").prepend("\n* ");
  temp("ol").find("li").each(function(i, elem) {
      if (temp(this).parent().attr("start") == undefined) {
          temp(this).prepend("\n1. ");
      } else {
          temp(this).prepend("\n"+temp(this).parent().attr("start")+ ". ");
      }
  }); 

  temp("td").each(function(i, elem) {
      temp(this).text(temp(this).text().replace(/^\n/g, "").replace(/^\n/g, ""));
  });

  temp("table").each(function(i, elem) {
      temp(this).prepend("\n");
      temp(this).find("tr").each(function(j, elem) {
          let tdCount = temp(this).find("td").length;
          temp(this).prepend("\n|");

          if (j == 0) {
              temp(this).append("\n|")
              for (var z = 0; tdCount > z; z++) {
                  temp(this).append("-|")
              }
          }
      });
      temp(this).find("td").append("|")
  });

  return temp.text(); //replace(htmlReplace(temp.html()));
}
router.get('/create/en/:isbn', function(req, res,next) {
    let isbn = req.params.isbn;
    let bookdb = new sqlite3.Database(bookDBPath);
    let mddb = new sqlite3.Database(mdPath);
    bookdb.all("SELECT * FROM content WHERE isbn = ? ORDER BY contentIndex", [isbn], function(err, rows) {
        mddb.run("INSERT INTO book_title (isbn, title, local) VALUES (?,?,?)", [isbn, "Java9", "en"], function(err) {
            if (err) {
              return console.log(err.message);
            }
            //console.log(`${this.lastID}`);
            rows.forEach(function(value, index, array) {
                mddb.run("INSERT INTO book_content VALUES (?,?,?,?)", [isbn, value.contentIndex, value.title, parser(value.content)], function(err) {        
                    if (err) {
                        console.log(err.message);
                    }
                    mddb.close();
                });
            });
        });
        bookdb.close();
    });
    
    
});



router.post('/create/en/:isbn', function(req, res, next) {

});

router.put('/create/en/:isbn', function (req, res, next) {

});



module.exports = router;
