var express = require('express');
var path = require('path');
var fs   = require('fs');
var ytdl = require('youtube-dl');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('youtube', { title: 'Express' });
});

router.get('/down', function(req, res, next) {

});

router.get('/downlist', function(req, res, next) {

});







module.exports = router;