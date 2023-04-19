//required packages
const express = require("express");
const path = require("path");
const fs = require("fs");

//Tasks Data
const tasksData = require("../tasks.json");

//routes initialization
const routes = express.Router();

//get all tasks
routes.get("/", (req, res) => {
  try {
    res.status(200);
    res.send(tasksData);
  } catch (err) {
    res.status(500);
    res.send({ message: "Something went wrong" });
  }
});

//get specific task

routes.get("/:taskId", (req, res) => {
  try {
    let airtribeTasks = tasksData.tasks;
    let { taskId } = req.params;
    let result = airtribeTasks.filter((task) => task.id == taskId);
    if (result) {
      res.status(200);
      res.send(result);
    } else {
      res.status(404);
      res.send({ message: "task not found" });
    }
  } catch (err) {
    res.status(500);
    res.send({ message: "Something went wrong" });
  }
});
