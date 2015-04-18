var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var config = require('../config');

var destDirUpload = path.join(__dirname, '..', 'static', 'photos', 'orig');

module.exports = multer({
  dest: destDirUpload,
  rename: rename
});

function rename(fieldname, filename) {
  return crypto.createHash('sha1').update(filename).digest('hex');
}
