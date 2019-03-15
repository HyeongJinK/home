const express = require('express');
const router = express.Router();
const project = require('./project');

console.info("Project Route...");
/**
 * project
 */
router.get("/", project.ProjectController.listView);
router.get("/list", project.ProjectController.list);
router.get("/read/:idx", project.ProjectController.readView);
router.route("/form")
.get(project.ProjectController.formView)
.post(project.ProjectController.save)
.put(project.ProjectController.update)
.delete(project.ProjectController.delete);
/**
 * version
 */
router.get("/version", project.VersionController.listView);
router.get("/version/list", project.VersionController.list);
router.get("/version/listByProductIdx", project.VersionController.listByProjectIdx);
router.get("/version/read/:idx", project.VersionController.readView);
router.route("/version/form")
.get(project.VersionController.formView)
.post(project.VersionController.save)
.put(project.VersionController.update)
.delete(project.VersionController.delete);
/**
 * task
 */
router.get("/task", project.TaskController.listView);
router.get("/task/list", project.TaskController.list);
router.get("/task/listByVersionIdx", project.TaskController.listByVersionIdx);
router.get("/task/read/:idx", project.TaskController.readView);
router.route("/task/form")
.get(project.TaskController.formView)
.post(project.TaskController.save)
.put(project.TaskController.update)
.delete(project.TaskController.delete);
/**
 * checkList
 */
router.get("/checkList/list", project.CheckListController.listByTaskIdx);
router.post("/checkList/save", project.CheckListController.save);
router.put("/checkList/update", project.CheckListController.update);
router.delete("/checkList/delete", project.CheckListController.delete);
router.post("/checkList/savecolumn", project.CheckListColumController.save);
router.put("/checkList/updatecolumn", project.CheckListColumController.update);
router.put("/checkList/deletecolumn", project.CheckListColumController.delete);

module.exports = router;