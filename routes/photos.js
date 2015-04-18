var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuid');

router.post('/', function(req, res, next) {
  fs.readFile(req.files.photo.path, function (err, data) {
    if (err) return next(err);
    var ext = req.files.photo.path.split('.').pop();
    var fileId = uuid.v4().substring(0, 8);
    var newPath = __dirname + "/static/photos/" + fileId + '.' + ext;
    fs.writeFile(newPath, data, function (err) {
      res.json({
        fileId: fileId
      });
    });
  });
});

module.exports = router;
