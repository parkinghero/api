var express = require('express');
var router = express.Router();
var models = require('../models');

var Client = require('node-rest-client').Client;
 
var client = new Client();

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
console.log(err, post);
    if (err) return next(err);

var args = {
  data: {
    issue: {
      project_id: 1,
      subject: post.subject,
      description: post.description,
    }
  },
  headers:{
    "X-Redmine-API-Key": "6a0792a421be0f8785dcdbf8efa9418611b8b714",
    "Content-Type": "application/json"
  } 
};
 
console.log(args);

client.post("http://issues.parkinghero.in.ua/issues.json", args, function(data,response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);

    res.json(post);
});

  });
});

module.exports = router;
