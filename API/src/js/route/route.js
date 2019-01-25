var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: '어떻게 오셨데요?' , menu: ["메인화면"]});
});

module.exports = router;