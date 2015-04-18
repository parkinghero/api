var express = require('express');
var router = express.Router();
var models = require('../models');

var testIssues = require('../dev/issues');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.json(testIssues);


  // models.Issue.find(function(err, issues) {
  //   if (err) return console.error(err);
  //   res.json(issues);
  // });
});

router.post('/', function(req, res, next) {
  models.Issue.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
