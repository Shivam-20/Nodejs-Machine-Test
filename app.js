const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/JT";
const student = require("./api/routes/candidate");
const exam = require("./api/routes/exam");

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.error("Error from callback" + err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);
app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/student", student);
app.use("/exam", exam);

app.use((req, res, next) => {
  const error = new Error("URL not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.messages,
  });
});

module.exports = app;
