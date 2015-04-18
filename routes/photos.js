var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var upload = require('../lib/upload');
var config = require('../config');

router.post('/', [upload, function(req, res, next) {
  var file = req.files['files[]'];
  var id = file.name.split('.').shift();
  var tempUrl = path.join(config.baseUrl, config.staticSubDirs.photosTemp);

  res.json({
    id: id,
    tempUrl: tempUrl
  });
}]);

module.exports = router;
