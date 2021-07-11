const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  assessmentLevels: {
    type: Array,
    required: false
  },
});

module.exports = User = mongoose.model("users", UserSchema);