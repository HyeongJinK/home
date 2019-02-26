console.info("File Route...");

const express = require('express');
const router = express.Router();
const multer = require('multer');


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

router.post('/create', upload.single("imgFile"), function(req, res, next) {
    let file = req.file
    console.log(file);
    let result = {
        originaName : file.originalname,
        size: file.size,
        extension: file.mimetype,
        filename: file.filename
    }

    res.send({result: result})
});

router.post('/creates', upload.array("imgFile"), function(req, res, next) {
    let files = req.files
    console.log(files);
    

    res.send({result: "result"})
});


module.exports = router;