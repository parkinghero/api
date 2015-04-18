var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var upload = require('../lib/upload');
var config = require('../config');

var destDirUpload = path.join(__dirname, '..', 'static', 'photos', 'orig');
var destDirUPreview = path.join(__dirname, '..', 'static', 'photos', 'thumb');

router.post('/', [upload, function(req, res, next) {
  var file = req.files['files[]'];
  var filePathSrc = destDirUpload + '/' + file.name;
  var filePathDst = destDirUPreview + '/' + file.name;

  res.json({
    photoFileName: file.name
  });

}]);

module.exports = router;
