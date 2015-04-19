var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var upload = require('../lib/upload');
var config = require('../config');
var easyimg = require('easyimage');


var destDirUpload = path.join(__dirname, '..', 'static', 'photos', 'orig');
var destDirUPreview = path.join(__dirname, '..', 'static', 'photos', 'thumb');

router.post('/', [upload, function(req, res, next) {
  var file = req.files['files[]'];
  var filePathSrc = destDirUpload + '/' + file.name;
  var filePathDst = destDirUPreview + '/' + file.name;

  var dim = 300;

  easyimg.info(filePathSrc).then(
    function(f) {
      var newW = f.width > f.height ? 300 : Math.floor(f.width * dim/f.height);
      var newH = f.height > f.width ? 300 : Math.floor(f.height * dim/f.width);

      easyimg.resize({
        src: filePathSrc,
        dst: filePathDst,
        width: newW,
        height: newH
      }).then(function() {
        res.json({
          photoFileName: file.name
        });
      }, next);

    }, next);

}]);

module.exports = router;
