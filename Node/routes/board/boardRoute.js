const express = require('express');
const router = express.Router();
const board = require("./board");

console.info("Board Route...");

router.get("/", board.BoardController.listView);
router.get("/list", board.BoardController.list);
router.route("/form")
.get(board.BoardController.formView)
.post(board.BoardController.edit)


router.get("/content", board.BoardContentController.listView);
router.get("/wiki", board.BoardContentController.wikiView);
router.get("/content/read/:idx", board.BoardContentController.readView);
router.route("/content/form")
.get(board.BoardContentController.formView)
.post(board.BoardContentController.save)
.put(board.BoardContentController.update)
.delete(board.BoardContentController.delete);
router.get("/content/list", board.BoardContentController.list);
router.get("/content/:idx", board.BoardContentController.read);

router.get("/journal", board.JournalController.listView);
router.get("/journal/list", board.JournalController.list);
router.post("/journal/form", board.JournalController.save);

module.exports = router;