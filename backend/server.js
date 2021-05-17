const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const dialogflow = require('dialogflow');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('./dev');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};


// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });
const sessionPath = sessionClient.sessionPath(projectID, sessionID);


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

app.post('/api/dialogflow/textQuery',async (req, res)=>{
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };
  
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      //if else correct or incorrect then add to 12 points divided by 12 all the time each addition of wrong 12 divided by 13, so on and so forth -----------------------------------------------------------------------------------
        //make sure that only when asking questions that are legit and not social interactive questions
        //should start when asking who are the characters ganun
          //BASIS ON ASSESSMENT
          //conceptual understanding—comprehension of mathematical concepts, operations, and relations
          //procedural fluency—skill in carrying out procedures flexibly, accurately, efficiently, and appropriately
          //strategic competence—ability to formulate, represent, and solve mathematical problems
          // first 8 - conceptual understanding and strategic competence
          // last 4 - procedural fluency skill
          // expert being 12 point --- intermediate being 8 points --- beginner being 4 points
      //if else finished then add to mongodb chatlog, so on and so forth --------------------------------------------------------------------------------------------------------------------------------------------------------
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }

    res.send(result);
})

app.post('/api/dialogflow/eventQuery',async(req,res)=>{

    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: req.body.event,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    //console.log('Detected intent');
    const result = responses[0].queryResult;
    //console.log(`  Query: ${result.queryText}`);
    //console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      //console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      //console.log(`  No intent matched.`);
    }

    res.send(result);
})

mongoose.connect("mongodb+srv://admin:1234@maincluster.3efyv.mongodb.net/Vi2DB?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000,()=>{
    console.log ( "Server Has Started" );
})

module.exports = router;