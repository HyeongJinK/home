const express = require('express');
const router = express.Router();
const project = require('./project');

console.info("Project Route...");
/**
 * project
 */
router.get("/", project.ProjectController.listView);
router.get("/list", project.ProjectController.list);
router.get("/read", project.ProjectController.readView);
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
router.get("/version/read", project.VersionController.readView);
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
router.get("/task/read", project.TaskController.readView);
router.route("/task/form")
.get(project.TaskController.formView)
.post(project.TaskController.save)
.put(project.TaskController.update)
.delete(project.TaskController.delete);

module.exports = router;