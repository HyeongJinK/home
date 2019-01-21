process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const query = require('./module/query');
const down = require('./module/down');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
var request = require("sync-request");   
let router = express.Router();
const bookDBPath = "db/books.db"
console.info("Pack - Down Route...")

router.get('/', function(req, res, next) {
    res.render('pack/down', { menu: ['PackPub', '스크래핑'] });
  });

router.get('/newisbn', function (req, res, next) {
    let isbnNum = req.query.isbnNum
    if (isbnNum == undefined) { isbnNum = 200 }
    let db = new sqlite3.Database(bookDBPath);
    let isbnArr = down.getIsbn(isbnNum)
    
    query.insertBookIsbn(db, isbnArr);
    res.send({"isbn" : isbnArr});
    db.close();
});
  
router.get('/getbook', function (req, res, next) {
    let db = new sqlite3.Database(bookDBPath);
    const user = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxM2IzN2RmYi0xNjhiLTRhZGYtYTdhNy03YzAyZjA1ZWY1MGEiLCJ1c2VybmFtZSI6Iml0ZW1wYW5nMUBnbWFpbC5jb20iLCJwZXJtaXNzaW9ucyI6W10sImlhdCI6MTUzMjMyOTMwNiwiZXhwIjoxNTMyMzMyOTA2fQ.wxAfdts52jV7NoZAG4hhfIigKFnZlQbTX-d9TJ8Uu99iW1qog6uvaACzLkvKEXW7gkJn1ehsXCHrOWw1RIMR2Xl4YwEvBy3E_p-xfPbJ2woC1lVYhh5qHiXsLegsvU5HsgPAIUZQP0Q9JAzYl6YGQiwlvylWKPy9gQGJmrOeBpH3LB8WF5pYO8zNUZL5NRXBgzr9SfVjSYZ5G3Mb9wBfbdS-0BL-X9uW7wfs0IdAqDEQygxWnC-NrqFOxYaTrE0Tm-d0lczuSWQRAAinlEAwJpUz0wIxTcnW5tD8BBBkALuGrFI4ByrarlKKTNIeyERSN3Y0kCHKex2VC2M8N3jblg";
    query.selectBookByNotData(db, (err, rows) => {
        for (index in rows) {
            let isbn = rows[index].isbn;
            
            let menuUrl = "https://www.packtpub.com/mapt-rest/products/"+isbn+"/metadata";
            let menuData = request("GET", menuUrl);
            
            let menuParserData = JSON.parse(menuData.getBody());

            if (menuParserData.data.title.indexOf("[Video]") == -1) {
                // let bookPath = downloadDataPath + replace(menuParserData.data.title)+"_"+isbn;
        
                if (menuParserData.status === 'success' && menuParserData.data.earlyAccess == false) {
                    // if (!fs.existsSync(bookPath)) {
                    //     fs.mkdirSync(bookPath, function(err) {
                    //         console.log(err);
                    //     })
                    // }
                    // console.log(mParserData.data.imageUrl) // 이미지
                    menuParserData.data.tableOfContents.forEach(element => {
                        let parentID = element.id
                        let baseContentUrl = "https://www.packtpub.com/mapt-rest/users/me/products/"+isbn+"/chapters/"+parentID;
                        let contentUrl;
                        let contentData;
                        let contentParserData;
                        element.children.forEach(element => {
                            if (parentID != element.id) {
                                contentUrl = baseContentUrl + "/sections/" + element.id
                            } else {
                                contentUrl = baseContentUrl;
                            }
        
                            try {
                                contentData = request("GET", contentUrl, {
                                    headers: {
                                        "Authorization" : user
                                    }
                                });
                                console.log("===========")
                                console.log(contentData.statusCode == 200)
                                console.log("===========")
                                if (contentData.statusCode == 200 && contentData.getBody().toString('utf-8') != "") {
                                    contentParserData = JSON.parse(contentData.getBody().toString('utf-8'));
            
                                    if (contentParserData.status === 'success') {
                                        if (contentParserData.data.entitled) {
                                            //fs.writeFileSync(bookPath+"/"+parentID+"_"+element.index+"_"+replace(element.title)+".html", contentParserData.data.content);
                                            console.log(parentID+"_"+element.index+"_"+element.title)
                                            //sleep(200);
                                        } else {
                                            console.log(parentID+"_"+element.index+"_"+element.title+"_demo")
                                        }
                                    }
                                } else {
                                    console.log("error :" +parentID+"_"+element.index+"_"+element.title);
                                    res.send({"error" : "키 만료"});
                                } 
                            } catch {
                                db.close();
                                res.send({"error" : "키 만료"});
                            }
                        })
                    });    
                }
            }
        }
    });
    db.close();
    res.send({"error" : "성공"});
});

router.get('/test', function (req, res, next) {
    console.log(down.downBookContent().length)
    //console.log(down.downBookContent()[0])
});

module.exports = router;