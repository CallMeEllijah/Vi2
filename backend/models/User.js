const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
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