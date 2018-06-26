var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('packBook', { title: 'Express' });
});

module.exports = router;
