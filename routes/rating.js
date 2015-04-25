var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var config = require('../config');
var redmine = require('../lib/redmine');
var _ = require('lodash');

var lawyers_group_id = 4;
var closed_status_id = 11;
var processing_status_id = 9;
var project_id = 1;

router.get('/lawyers', function(req, res, next) {
  redmine.get('users', { group_id: lawyers_group_id }, function(err, users) {
    redmine.get('issues', { project_id: project_id }, function(err, issues) {
      var result = [];

      users.forEach(function(user) {
        result.push({
          name: user.firstname + ' ' + user.lastname,
          closedIssuesQuauntity: _.filter(issues,  function(issue){
              return issue.assigned_to && issue.assigned_to.id == user.id && issue.status.id == closed_status_id;
            }).length,
          assignedIssuesQuauntity: _.filter(issues,  function(issue){
              return issue.assigned_to && issue.assigned_to.id == user.id;
            }).length,
          processingIssuesQuauntity: _.filter(issues,  function(issue){
              return issue.assigned_to && issue.assigned_to.id == user.id && issue.status.id == processing_status_id;
            }).length,
          registrationDate: user.created_on
        });
      });

      res.json(result);
    });
  });

});

module.exports = router;
