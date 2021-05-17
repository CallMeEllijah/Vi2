const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatlogSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    required: true
  }
});

module.exports = User = mongoose.model("chatlogs", ChatlogSchema);