var express = require('express');
var router = express.Router();

console.info("Index Route...")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./index_new', { title: '어떻게 오셨데요?' , menu: ["메인화면"]});
});

module.exports = router;
