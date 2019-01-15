const express = require('express');
const router = express.Router();
const todoDB = require('./db/todo');


console.info("Todo Route...");

router.get("/", (req, res) => {
    res.render("/todo/list", {menu : ["TODO", "TODO 목록"]})
});

router.get("/form", (req, res) => {
    res.render("/todo/read", {menu : ["TODO", ""]});
});

router.get("/list", (req, res) => {
    todoDB.findByAll([]
        , (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.send({"data" : rows});
        });
});

router.post("/form", (req, res) => {

});

router.put("/form", (req, res) => {
    
});

router.delete("/form", (req, res) => {
    
});

router.post("/checklist/add", (req, res) => {
    
});
router.put("/checklist/modify", (req, res) => {
    
});
router.delete("/checklist/del", (req, res) => {
    
});


module.exports = router;