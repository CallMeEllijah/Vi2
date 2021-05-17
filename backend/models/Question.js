const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  problem: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  numberofquestions: {
    type: Number,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  questionanswers: {
    type: Array,
    required: true
  },
  questiontypes: {
    type: Array,
    required: true
  }
});

module.exports = User = mongoose.model("questions", QuestionSchema);