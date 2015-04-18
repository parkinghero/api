var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var multer = require('multer');
var config = require('../config');

var destDir = path.join(__dirname, '..', config.staticDir, config.staticSubDirs.photosTemp);

module.exports = multer({
  dest: destDir,
  rename: function (fieldname, filename) {
    return uuid.v4().substring(0, 8);
  }
});
