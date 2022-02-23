const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  
  problem1q1cu: {
    type: Number,
    required: false
  },
  problem1q2cu: {
    type: Number,
    required: false
  },
  problem1q1pf: {
    type: Number,
    required: false
  },
  problem1q2pf: {
    type: Number,
    required: false
  },
  problem1q1sc: {
    type: Number,
    required: false
  },
  problem1q2sc: {
    type: Number,
    required: false
  },
  problem1q3sc: {
    type: Number,
    required: false
  },
  assessmentLevel1cu: {
    type: String,
    required: false
  },
  assessmentLevel1pf: {
    type: String,
    required: false
  },
  assessmentLevel1sc: {
    type: String,
    required: false
  },
  assessmentLevel1time: {
    type: String,
    required: false
  },

  problem2q1cu: {
    type: Number,
    required: false
  },
  problem2q2cu: {
    type: Number,
    required: false
  },
  problem2q1pf: {
    type: Number,
    required: false
  },
  problem2q2pf: {
    type: Number,
    required: false
  },
  problem2q1sc: {
    type: Number,
    required: false
  },
  problem2q2sc: {
    type: Number,
    required: false
  },
  problem2q3sc: {
    type: Number,
    required: false
  },
  assessmentLevel2cu: {
    type: String,
    required: false
  },
  assessmentLevel2pf: {
    type: String,
    required: false
  },
  assessmentLevel2sc: {
    type: String,
    required: false
  },
  assessmentLevel2time: {
    type: String,
    required: false
  },

  problem3q1cu: {
    type: Number,
    required: false
  },
  problem3q2cu: {
    type: Number,
    required: false
  },
  problem3q1pf: {
    type: Number,
    required: false
  },
  problem3q2pf: {
    type: Number,
    required: false
  },
  problem3q1sc: {
    type: Number,
    required: false
  },
  problem3q2sc: {
    type: Number,
    required: false
  },
  problem3q3sc: {
    type: Number,
    required: false
  },
  assessmentLevel3cu: {
    type: String,
    required: false
  },
  assessmentLevel3pf: {
    type: String,
    required: false
  },
  assessmentLevel3sc: {
    type: String,
    required: false
  },
  assessmentLevel3time: {
    type: String,
    required: false
  },

  problem4q1cu: {
    type: Number,
    required: false
  },
  problem4q2cu: {
    type: Number,
    required: false
  },
  problem4q1pf: {
    type: Number,
    required: false
  },
  problem4q2pf: {
    type: Number,
    required: false
  },
  problem4q1sc: {
    type: Number,
    required: false
  },
  problem4q2sc: {
    type: Number,
    required: false
  },
  problem4q3sc: {
    type: Number,
    required: false
  },
  assessmentLevel4cu: {
    type: String,
    required: false
  },
  assessmentLevel4pf: {
    type: String,
    required: false
  },
  assessmentLevel4sc: {
    type: String,
    required: false
  },
  assessmentLevel4time: {
    type: String,
    required: false
  },

  problem5q1cu: {
    type: Number,
    required: false
  },
  problem5q2cu: {
    type: Number,
    required: false
  },
  problem5q1pf: {
    type: Number,
    required: false
  },
  problem5q2pf: {
    type: Number,
    required: false
  },
  problem5q1sc: {
    type: Number,
    required: false
  },
  proble51q2sc: {
    type: Number,
    required: false
  },
  problem5q3sc: {
    type: Number,
    required: false
  },
  assessmentLevel5cu: {
    type: String,
    required: false
  },
  assessmentLevel5pf: {
    type: String,
    required: false
  },
  assessmentLevel5sc: {
    type: String,
    required: false
  },
  assessmentLevel5time: {
    type: String,
    required: false
  },

  problem5q1cu: {
    type: Number,
    required: false
  },
  problem5q2cu: {
    type: Number,
    required: false
  },
  problem5q1pf: {
    type: Number,
    required: false
  },
  problem5q2pf: {
    type: Number,
    required: false
  },
  problem5q1sc: {
    type: Number,
    required: false
  },
  problem5q2sc: {
    type: Number,
    required: false
  },
  problem5q3sc: {
    type: Number,
    required: false
  },
  assessmentLevel6cu: {
    type: String,
    required: false
  },
  assessmentLevel6pf: {
    type: String,
    required: false
  },
  assessmentLevel6sc: {
    type: String,
    required: false
  },
  assessmentLevel6time: {
    type: String,
    required: false
  },

  
  time: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: false
  },
});

module.exports = User = mongoose.model("users", UserSchema);