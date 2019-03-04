console.info("File Route...");

const express = require('express');
const router = express.Router();
const multer = require('multer');

const common = require("../db/connect.js");
const fileDB = require("./db/fileDB");


let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads/")
        },
        // filename: (req, file, callback) => {
        //     console.log(file)
        //     callback(null, "adf")
        // }
    }),
    limits: {fileSize : 5 * 1024 * 1024}
});

router.get('/', function(req, res, next) {
    res.render('file/list', { menu: ['파일관리', '리스트'] });
});

router.get('/list', (req, res) => {
    common.dbOpen({"path": common.config.db.file, "findByAllParam": []})
        .then(fileDB.FileService.findByAll)
        .then(common.dbClose)
        .then((result) => {
            if (result.err) {
                console.log(result.err);
            }
            
            res.send({rows : result.files, page: 1, total: 1, records: result.files.length});
        });
});

router.post('/create', upload.single("imgFile"), function(req, res, next) {
    let file = req.file;
    let description = req.body.description;
    common.dbOpen({"path": common.config.db.file, "saveParam": [file.originalname
    , file.filename
    , description
    , file.mimetype
    , file.size]})
    .then(fileDB.FileService.save)
    .then(common.dbClose)
    .then((result) => {
        res.redirect("/file");
    });
});

router.post('/creates', upload.array("imgFile"), function(req, res, next) {
    let files = req.files
    console.log(files);
    

    res.send({result: "result"})
});

module.exports = router;