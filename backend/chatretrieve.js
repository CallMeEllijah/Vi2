const mongoose = require("mongoose");
const Chatlogs = require("./models/Chatlogs");
const fs = require('fs')

mongoose.connect("mongodb+srv://admin:1234@maincluster.3efyv.mongodb.net/Vi2DB?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
var wholechatlog = ""

Chatlogs.findOne({userID : "61a726c45aa3090016b4659e"}).then(chatlog => {
    for(var i = 0; i < chatlog.messages.length; i++){
        if(chatlog.messages[i].type == "botMessageContainer"){
            var text = "Vi2 : " + chatlog.messages[i].message + "\n"
            wholechatlog += text
        }
        else if(chatlog.messages[i].type == "userMessageContainer"){
            var text = "User : " + chatlog.messages[i].message + "\n"
            wholechatlog += text
        }
    }

    fs.writeFile('Cristoff Chatlog.txt', wholechatlog, err => {
        if(err){
            console.err
            return
        }
    })
})