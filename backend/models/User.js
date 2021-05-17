const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  assessmentLevel: {
    type: Array,
    required: true
  },
  corrects: {
    type: Number,
    required: true
  },
  mistakes: {
    type: Number,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);