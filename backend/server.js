const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const QUESTIONS = require('./models/Question')
const USER = require('./models/User')

const config = require('./dev');
const Question = require("./models/Question");
const User = require("./models/User");
const Chatlogs = require("./models/Chatlogs");

const { v4: uuidv4 } = require('uuid');
var id = uuidv4()

const projectID = config.googleProjectID;
const languageCode = config.dialogFlowSessionLanguageCode;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};


// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

// var sessionID = "";
// var sessionPath = {};

const app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(express.json());

//for deployment
app.use(express.static(path.join(__dirname, '../client/build/')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'))
})

// app.post('/setSessionID', (req, res) => {
//   sessionID = req.body.seshID;
//   console.log(req.body);
//   sessionPath = sessionClient.sessionPath(projectID, sessionID);
// })


const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionId);

  let request = {
    session: sessionPath,
    queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: queryText,
          // The language used by the client (en-US)
          languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  //console.log(responses);
  const result = responses[0].queryResult;
  //console.log(result);

  return {
      response: result
  };

}

const detectEvent = async (languageCode, queryEvent, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionId);

  let request = {
    session: sessionPath,
    queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: queryEvent,
          // The language used by the client (en-US)
          languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  //console.log(responses);
  const result = responses[0].queryResult;
  //console.log(result);

  return {
      response: result
  };

}

app.post('/api/dialogflow/textQuery',async (req, res)=>{
    // // The text query request.
    // const request = {
    //   session: sessionPath,
    //   queryInput: {
    //     text: {
    //       // The query to send to the dialogflow agent
    //       text: req.body.text,
    //       // The language used by the client (en-US)
    //       languageCode: 'en-US',
    //     },
    //   },
    // };
  
    // // Send request and log result
    // const responses = await sessionClient.detectIntent(request);
    // console.log('Detected intent');
    // const result = responses[0].queryResult;
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    // if (result.intent) {
    //   console.log(`  Intent: ${result.intent.displayName}`);
    // } else {
    //   console.log(`  No intent matched.`);
    // }
    // res.send(result);

    let languageCode = 'en-US';
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

    let responseData = await detectIntent(languageCode, queryText, sessionId);

    res.send(responseData);

})

app.post('/api/dialogflow/eventQuery',async(req,res)=>{

    // const request = {
    //   session: sessionPath,
    //   queryInput: {
    //     event: {
    //       // The query to send to the dialogflow agent
    //       name: req.body.event,
    //       // The language used by the client (en-US)
    //       languageCode: 'en-US',
    //     },
    //   },
    // };

    // // Send request and log result
    // const responses = await sessionClient.detectIntent(request);
    // //console.log('Detected intent');
    // const result = responses[0].queryResult;
    // //console.log(`  Query: ${result.queryText}`);
    // //console.log(`  Response: ${result.fulfillmentText}`);
    // if (result.intent) {
    //   //console.log(`  Intent: ${result.intent.displayName}`);
    // } else {
    //   //console.log(`  No intent matched.`);
    // }

    // res.send(result);

    let languageCode = 'en-US';
    let queryEvent = req.body.queryEvent;
    let sessionId = req.body.sessionId;

    let responseData = await detectEvent(languageCode, queryEvent, sessionId);

    res.send(responseData);
})

// MONGODB ROUTES ------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/getProblem',(req,res)=>{
    const number = req.body.number + ""
    QUESTIONS.findOne({number : number}).then(question => {
      res.send(question.number + "")
    })
})

app.post('/addUser',(req,res)=>{
  var d = new Date();
  var time = d.toLocaleTimeString();
  const newUser = new User({
    name: req.body.name,
    problem1q1cu: 0,
    problem1q2cu: 0,
    problem1q1pf: 0,
    problem1q2pf: 0,
    problem1q1sc: 0,
    problem1q2sc: 0,
    problem1q3sc: 0,
    assessmentLevel1cu: "",
    assessmentLevel1pf: "",
    assessmentLevel1sc: "",
    assessmentLevel1time: "",
  
  
    problem2q1cu: 0,
    problem2q2cu: 0,
    problem2q1pf: 0,
    problem2q2pf: 0,
    problem2q1sc: 0,
    problem2q2sc: 0,
    problem2q3sc: 0,
    assessmentLevel2cu: "",
    assessmentLevel2pf: "",
    assessmentLevel2sc: "",
    assessmentLevel2time: "",
  
  
    problem3q1cu: 0,
    problem3q2cu: 0,
    problem3q1pf: 0,
    problem3q2pf: 0,
    problem3q1sc: 0,
    problem3q2sc: 0,
    problem3q3sc: 0,
    assessmentLevel3cu: "",
    assessmentLevel3pf: "",
    assessmentLevel3sc: "",
    assessmentLevel3time: "",
  
  
    problem4q1cu: 0,
    problem4q2cu: 0,
    problem4q1pf: 0,
    problem4q2pf: 0,
    problem4q1sc: 0,
    problem4q2sc: 0,
    problem4q3sc: 0,
    assessmentLevel4cu: "",
    assessmentLevel4pf: "",
    assessmentLevel4sc: "",
    assessmentLevel4time: "",

  
    problem5q1cu: 0,
    problem5q2cu: 0,
    problem5q1pf: 0,
    problem5q2pf: 0,
    problem5q1sc: 0,
    problem5q2sc: 0,
    problem5q3sc: 0,
    assessmentLevel5cu: "",
    assessmentLevel5pf: "",
    assessmentLevel5sc: "",
    assessmentLevel5time: "",
  
  
    problem6q1cu: 0,
    problem6q2cu: 0,
    problem6q1pf: 0,
    problem6q2pf: 0,
    problem6q1sc: 0,
    problem6q2sc: 0,
    problem6q3sc: 0,
    assessmentLevel6cu: "",
    assessmentLevel6pf: "",
    assessmentLevel6sc: "",
    assessmentLevel6time: "",

    time: time,
    endTime: ""
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
})

app.post('/addchatlog', (req,res)=> {
  const newChatlog = new Chatlogs({
    userID: req.body.id,
    messages: req.body.messages
  });

  newChatlog.save()
    .then(chatlog => res.json(chatlog))
    .catch(err => res.json(err))
})

app.post('/updateAssessmentLevel',(req,res)=>{
  USER.findById({_id: req.body.id}).then(user => {
    if(user){
      var levelu = "";
      var levelf = "";
      var levelc = "";
      
      var d = new Date();
      var time = d.toLocaleTimeString();

      if(req.body.q1sc == 0 && req.body.q2sc == 2 && req.body.q3sc == 0){
        levelc = "exemplary";
      }
      else if(req.body.q1sc > 1 || req.body.q2sc > 1 || req.body.q3sc > 1){
        levelc = "beginning";
      }
      else if(req.body.q1sc > 0 || req.body.q2sc > 0 || req.body.q3sc > 0){
        levelc = "developing";
      }

      if(req.body.q1cu == 0 && req.body.q1cu ==0){
        levelu = "expert";
      }
      else if(req.body.q1cu > 1 || req.body.q1cu > 1){
        levelu = "beginning";
      }
      else if(req.body.q1cu > 0 || req.body.q1cu > 0){
        levelu = "developing";
      }

      if(req.body.q1pf == 0 && req.body.q1pf ==0){
        levelf = "expert";
      }
      else if(req.body.q1pf > 1 || req.body.q1pf > 1){
        levelf = "beginning";
      }
      else if(req.body.q1pf > 0 || req.body.q1pf > 0){
        levelf = "developing";
      }
      
      //-------------------start update db assessment level----------
      switch(req.body.problemno){
        case 1:
          USER.findByIdAndUpdate(req.body.id, {
            $set:{
              problem1q1cu: req.body.q1cu,
              problem1q2cu: req.body.q2cu,
              problem1q1pf: req.body.q1pf,
              problem1q2pf: req.body.q2pf,
              problem1q1sc: req.body.q1sc,
              problem1q2sc: req.body.q2sc,
              problem1q3sc: req.body.q3sc,
            assessmentLevel1cu: levelu,
            assessmentLevel1pf: levelf,
            assessmentLevel1sc: levelc,
            assessmentLevel1time: time
            }
          }, function(err, result){
            if(err){
                console.log("oof")
            }
            else{
              res.send(200)
            }
          })
          break; 
        case 2:
          USER.findOneAndUpdate({_id: req.body.id}, {
            $set:{
              problem2q1cu: req.body.q1cu,
              problem2q2cu: req.body.q2cu,
              problem2q1pf: req.body.q1pf,
              problem2q2pf: req.body.q2pf,
              problem2q1sc: req.body.q1sc,
              problem2q2sc: req.body.q2sc,
              problem2q3sc: req.body.q3sc,
            assessmentLevel2cu: levelu,
            assessmentLevel2pf: levelf,
            assessmentLevel2sc: levelc,
            assessmentLevel2time: time
            }
          }, function(err, result){
            if(err){
                console.log("oof")
            }
            else{
              res.send(200)
            }
          })
          break; 
        case 3:
          USER.findByIdAndUpdate({_id: req.body.id}, {
            $set:{
              problem3q1cu: req.body.q1cu,
              problem3q2cu: req.body.q2cu,
              problem3q1pf: req.body.q1pf,
              problem3q2pf: req.body.q2pf,
              problem3q1sc: req.body.q1sc,
              problem3q2sc: req.body.q2sc,
              problem3q3sc: req.body.q3sc,
            assessmentLevel3cu: levelu,
            assessmentLevel3pf: levelf,
            assessmentLevel3sc: levelc,
            assessmentLevel3time: time
            }
          }, function(err, result){
            if(err){
                console.log("oof")
            }
            else{
              res.send(200)
            }
          })
          break; 
        case 4:
          USER.findByIdAndUpdate({_id: req.body.id}, {
            $set:{
              problem4q1cu: req.body.q1cu,
              problem4q2cu: req.body.q2cu,
              problem4q1pf: req.body.q1pf,
              problem4q2pf: req.body.q2pf,
              problem4q1sc: req.body.q1sc,
              problem4q2sc: req.body.q2sc,
              problem4q3sc: req.body.q3sc,
            assessmentLevel4cu: levelu,
            assessmentLevel4pf: levelf,
            assessmentLevel4sc: levelc,
            assessmentLevel4time: time
            }
          }, function(err, result){
            if(err){
                console.log("oof")
            }
            else{
              res.send(200)
            }
          })
          break; 
        case 5:
          USER.findByIdAndUpdate({_id: req.body.id}, {
            $set:{
              problem5q1cu: req.body.q1cu,
              problem5q2cu: req.body.q2cu,
              problem5q1pf: req.body.q1pf,
              problem5q2pf: req.body.q2pf,
              problem5q1sc: req.body.q1sc,
              problem5q2sc: req.body.q2sc,
              problem5q3sc: req.body.q3sc,
            assessmentLevel5cu: levelu,
            assessmentLevel5pf: levelf,
            assessmentLevel5sc: levelc,
            assessmentLevel5time: time
            }
          }, function(err, result){
            if(err){
                console.log("oof")
            }
            else{
              res.send(200)
            }
          })
          break; 
        case 6:
          USER.findByIdAndUpdate({_id: req.body.id}, {
            $set:{
              problem6q1cu: req.body.q1cu,
              problem6q2cu: req.body.q2cu,
              problem6q1pf: req.body.q1pf,
              problem6q2pf: req.body.q2pf,
              problem6q1sc: req.body.q1sc,
              problem6q2sc: req.body.q2sc,
              problem6q3sc: req.body.q3sc,
            assessmentLevel6cu: levelu,
            assessmentLevel6pf: levelf,
            assessmentLevel6sc: levelc,
            assessmentLevel6time: time,
            endTime: time
            }
          }, function(err, result){
            if(err){
                console.log("oof")
            }
            else{
              res.send(200)
            }
          })
          break; 
      }
      //-----------------------------end-------------------
    }
  })
})

// MONGODB ROUTES ------------------------------------------------------------------------------------------------------------------------------------------------------------------

mongoose.connect("mongodb+srv://admin:1234@maincluster.3efyv.mongodb.net/Vi2DB?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000,()=>{
    console.log ( "Server Has Started" );
})

module.exports = router;