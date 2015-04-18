var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongodb.uri);

// var UserSchema = new mongoose.Schema({
//   id: "111111111111111111",
//   first_name: "AAA", 
//   gender: "male", 
//   last_name: "AAA", 
//   link: "http://www.facebook.com/11111111111111", 
//   locale: "uk_UA", 
//   name: "asdasdasdasdasd", 
//   timezone: 3, 
//   updated_time: "2015-01-11T08:02:23+0000", 
//   verified: true
// });

var IssuesSchema = new mongoose.Schema({
  title: String,
  photoId: { type: String, required: true },
  description: String,
  licensePlateNumber: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  address: { type: String, required: true },
  photographingDate: { type: Date, required: true },
  violationType: { type: String, enum: ["a", "b", "c", "d", "e", "f"], required: true },
  status: { type: String, default: "pending" },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

module.exports = {
	Issue: mongoose.model('Issue', IssuesSchema)
};
