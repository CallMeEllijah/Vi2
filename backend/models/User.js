const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  assessmentLevel1: {
    type: String,
    required: false
  },
  assessmentLevel2: {
    type: String,
    required: false
  },
  assessmentLevel3: {
    type: String,
    required: false
  },
  assessmentLevel4: {
    type: String,
    required: false
  },
  assessmentLevel5: {
    type: String,
    required: false
  },
  assessmentLevel6: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);