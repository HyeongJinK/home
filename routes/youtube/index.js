var express = require('express');
var path = require('path');
var fs   = require('fs');
var ytdl = require('youtube-dl');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('youtube', { title: 'Express' });
});

module.exports = router;
//playlist('https://www.youtube.com/playlist?list=PLFoH8spXdgNHUPpEhqktU9IPawKXFpn4B');
function playlist(url) {
 
  'use strict';
  var video = ytdl(url);
 
  video.on('error', function error(err) {
    console.log('error 2:', err);
  });
 var size = 0;
  video.on('info', function(info) {
    size = info.size;
    console.log("\n" + info._filename);
    video.pipe(fs.createWriteStream("./download/"+info._filename));
  });
 
  var pos = 0;
  video.on('data', function data(chunk) {
    pos += chunk.length;
    // `size` should not be 0 here.
    if (size) {
      var percent = (pos / size * 100).toFixed(2);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(1);
      process.stdout.write(percent + '%');
    }
  });
 
  video.on('next', playlist); 
}
