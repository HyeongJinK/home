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
            res.send({"list" : rows});
        });
});

router.post("/form");

router.put("/form");

router.delete("/form");

router.post("/checklist/add");
router.put("/checklist/modify");
router.delete("/checklist/del");


module.exports = router;