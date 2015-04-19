var config = require('../config');
var Client = require('node-rest-client').Client;
var querystring = require('querystring');
 
var client = new Client();

var headers = {
  "X-Redmine-API-Key": "6a0792a421be0f8785dcdbf8efa9418611b8b714",
  "Content-Type": "application/json"
};

module.exports = {
  buildIssueDescription: function(data) {
    var desc = data.description || '';

    desc += "\n\n";
    desc += "*Ім'я автора:* " + data.userName + "\n";
    desc += "*E-mail автора:* " + data.userEmail + "\n\n";
    desc += "*Номер авто:* " + data.licensePlateNumber + "\n";
    desc += "*Тип порушення:* " + {
      a: "Паркування другим рядом",
      b: "Паркування під знаком \"зупинка заборонена",
      c: "Паркування на тротуарі",
      d: "Паркування на пішохідному переході",
      e: "Паркування на місці для інвалідів",
      f: "Паркування на газоні",
    }[data.violationType] + "\n\n";

    desc += "*Дата фотографування:* " + data.photographingDate + "\n";
    desc += "*Фото:*\n !" + (config.baseUrl + '/photos/orig/' + data.photoFileName) + "!\n\n";

    return desc;
  },
  createIssue: function(issue, callback) {
    client.post(config.redmineUrl + "/issues.json", {
      data: { issue: issue },
      headers: headers
    }, function(data,response) {
      var json = JSON.parse(data.toString()).issue;
      callback(null, json);
    });
  },
  get: function(what, params, callback) {
    var qs = params ? querystring.encode(params) : '';

    client.get(config.redmineUrl + "/" + what + ".json?" + qs, {
      headers: headers
    }, function(data, response) {
      var json = JSON.parse(data.toString())[what];
      callback(null, json);
    });
  }
}
