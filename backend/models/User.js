const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  assessmentLevel1: {
    type: Array,
    required: false
  },
  assessmentLevel2: {
    type: Array,
    required: false
  },
  assessmentLevel3: {
    type: Array,
    required: false
  },
  assessmentLevel4: {
    type: Array,
    required: false
  },
  assessmentLevel5: {
    type: Array,
    required: false
  },
  assessmentLevel6: {
    type: Array,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);