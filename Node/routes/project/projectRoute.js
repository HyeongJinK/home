const express = require('express');
const router = express.Router();
const project = require('./project');



console.info("Project Route...");

router.get("/", project.list);

router.route("/form")
.get(project.taskForm)
.post(project.taskAdd)
.put(project.taskMod)
.delete(project.taskDel);

router.get("/read", project.taskRead);

router.get("/list", project.getList);


router.post("/type/add", project.typeAdd);

router.post("/status/add", project.statusAdd)

router.post("/checklist/add", (req, res) => {
    
});
router.put("/checklist/modify", (req, res) => {
    
});
router.delete("/checklist/del", (req, res) => {
    
});


module.exports = router;