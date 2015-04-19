var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongodbUri);

var IssuesSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  photoFileName: { type: String, required: true },
  description: String,
  lng: Number,
  lat: Number,
  licensePlateNumber: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  address: { type: String, required: true },
  photographingDate: { type: Date, required: true },
  violationType: { type: String, enum: ["a", "b", "c", "d", "e", "f"], required: true },
  status: { type: String, enum: ["rejected", "moderation", "processing", "closed"], default: "moderation" },
  redmineIssueId: { type: Number },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

module.exports = {
	Issue: mongoose.model('Issue', IssuesSchema)
};
