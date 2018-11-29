var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_new', { title: '어떻게 오셨데요?' });
});

module.exports = router;
