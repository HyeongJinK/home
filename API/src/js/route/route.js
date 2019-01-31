const express = require('express');
const router = express.Router();

const board = require("./board");

router.get('/', function(req, res) {
  res.render('index.html', { title: '어떻게 오셨데요?' , menu: ["메인화면"]});
});

router.use('/board', board);



module.exports = router;