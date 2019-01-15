const express = require('express');
const router = express.Router();
const todoDB = require('./db/todo');


console.info("Todo Route...");

router.get("/", (req, res) => {
    res.render("todo/list", {menu : ["TODO", "TODO 목록"]})
});

router.route("/form")
.get((req, res) => {
    res.render("todo/form", {menu : ["TODO", ""]});
}).post((req, res) => {
    todoDB.save([], (err) => {

    });
}).put((req, res) => {
    todoDB.update([], (err) => {

    });
}).delete((req, res) => {
    
});

router.get("/read", (req, res) => {
    res.render("todo/read", {menu : ["TODO", ""]});
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

router.post("/checklist/add", (req, res) => {
    
});
router.put("/checklist/modify", (req, res) => {
    
});
router.delete("/checklist/del", (req, res) => {
    
});


module.exports = router;