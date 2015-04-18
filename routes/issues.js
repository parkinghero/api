var express = require('express');
var router = express.Router();
var models = require('../models');
var redmine = require('../lib/redmine');
var mail = require('../lib/mail');
var sanitize = require("mongo-sanitize");

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
  req.body = sanitize(req.body);

  models.Issue.create(req.body, function (err, post) {
    if (err) return next(err);

    redmine.createIssue({
      project_id: 1,
      subject: post.subject,
      description: redmine.buildIssueDescription(post),
    }, function(err, redmineIssue) {
      post.update({ $set: { redmineIssueId: redmineIssue.id }}, {}, function(err) {
        if (err) return next(err);

        var data = post.toJSON();
            data.redmineIssueId = redmineIssue.id;
        
        mail.sendIssueCreated(data, function(err) {
          if (err) return next(err);
          
          res.json(data);
        });

      })
    });

  });
});

module.exports = router;
