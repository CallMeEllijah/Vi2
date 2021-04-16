const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

mongoose.connect("mongodb+srv://admin:1234@maincluster.3efyv.mongodb.net/Vi2DB?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server on port 5000'));