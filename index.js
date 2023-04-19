//Importing required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskInfo = require('./routes/taskInfo');

const routes = express.Router();

//initializing app
const app = express();

//adding required middlewares
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

//task manager routes

app.use('/tasks',taskInfo);

//health check
routes.get("/", (req, res) => {
  res.status(200).send("Welcome to the airtribe Task Manager app");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});