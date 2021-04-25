const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const dialogflow = require('dialogflow');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('./dev');

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID


// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const app = express();
app.use(cors())

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(express.json());

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'client', 'build', 'index.html'));
});

app.post('/api/dialogflow/textQuery',async (req, res)=>{
    console.log("kekeke")
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
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
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