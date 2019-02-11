const express = require('express');
const router = express.Router();
const todo = require('./todo');



console.info("Todo Route...");

router.get("/", todo.list);

router.route("/form")
.get(todo.todoForm)
.post(todo.todoAdd)
.put(todo.todoMod)
.delete(todo.todoDel);

router.get("/read", todo.todoRead);

router.get("/list", todo.getList);


router.post("/type/add", todo.typeAdd);

router.post("/status/add", todo.statusAdd)

router.post("/checklist/add", (req, res) => {
    
});
router.put("/checklist/modify", (req, res) => {
    
});
router.delete("/checklist/del", (req, res) => {
    
});


module.exports = router;