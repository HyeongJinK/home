const express = require('express');
const router = express.Router();
const board = require("./board");

console.info("Board Route...");

router.get("/", board.list);

router.get("/content", board.contentList);

router.get("/content/read/:idx", board.contentRead);

router.route("/content/form")
.get(board.contentForm)
.post(board.contentInsert)
.put(board.contentUpdate)
.delete(board.contentDelete);

router.get("/content/list", board.getContentList);

router.get("/content/:idx", board.getContent);

module.exports = router;