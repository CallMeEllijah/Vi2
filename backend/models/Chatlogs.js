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
  },

  __v: {
    type: Number,
    required :true
  }
});

module.exports = Chatlog = mongoose.model("chatlogs", ChatlogSchema);