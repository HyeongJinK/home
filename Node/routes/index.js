var express = require('express');
var router = express.Router();

console.log("Index Route...")

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.isAuthenticated());
  res.render('index_new', { title: '어떻게 오셨데요?' , menu: ""});
});

module.exports = router;
