//required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const validator = require("../helper/validator");
//Tasks Data
const tasksData = require("../tasks.json");

//routes initialization
const routes = express.Router();

//get all tasks
routes.get("/", (req, res) => {
  try {
    let { sortBy, orderBy, isCompleted } = req.query;
    let airtribeTasks = tasksData.tasks;

    if (sortBy) {
      if (orderBy == "desc") {
        airtribeTasks = airtribeTasks.sort((task1, task2) => {
          let d1 = new Date(task1.created_at);
          let d2 = new Date(task2.created_at);
          return d1.getTime() > d2.getTime();
        });
      } else {
        airtribeTasks = airtribeTasks.sort((task1, task2) => {
          let d1 = new Date(task1.created_at);
          let d2 = new Date(task2.created_at);
          return d1.getTime() < d2.getTime();
        });
      }
    }
    res.status(200);
    res.send({ tasks: airtribeTasks });
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

//create a task
routes.post("/", (req, res) => {
  try {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, "../data", "tasks.json");
    if (validator.validateTaskInfo(taskDetails, tasksData).status) {
      let tempTaskData = { ...tasksData };
      tempTaskData.tasks.push(taskDetails);
      fs.writeFileSync(writePath, JSON.stringify(tempTaskData), {
        encoding: "utf8",
        flag: "w",
      });
      res.status(200);
      res.json(validator.validateCourseInfo(taskDetails, tasksData));
    } else {
      res.status(400);
      res.json(validator.validateTaskInfo(taskDetails, tasksData));
    }
  } catch (err) {
    res.status(500);
    res.send({ message: "Something went wrong" });
  }
});

//update a task
routes.post("/:taskId", (req, res) => {
  try {
    const taskDetails = req.body;
    const { taskId } = req.params;
    let writePath = path.join(__dirname, "../data", "tasks.json");
    if (validator.validateTaskInfo(taskDetails, tasksData).status) {
      let tempTaskData = { ...tasksData };
      let isFound = false;
      tempTaskData.tasks = tempTaskData.tasks.map((item) => {
        if (item.id == taskId) {
          isFound = true;
          return { ...taskDetails };
        }
        return item;
      });
      if(isFound){
        fs.writeFileSync(writePath, JSON.stringify(tempTaskData), {
          encoding: "utf8",
          flag: "w",
        });
        res.status(200);
        res.send({ message: "task Updated successfully" });
      }else{
        res.status(404);
        res.send({ message: "task not found" });
      }
    } else {
      res.status(400);
      res.json(validator.validateTaskInfo(taskDetails, tasksData));
    }
  } catch (err) {
    res.status(500);
    res.send({ message: "Something went wrong" });
  }
});

//Delete a task
routes.delete("/:taskId", (req, res) => {
  try {
    const { taskId } = req.params;
    let writePath = path.join(__dirname, "../data", "tasks.json");
    let tempTaskData = { ...tasksData };

    let isTaskFound = false;
    tempTaskData.task = tempTaskData.task.filter((item) => {
      if (item.id == taskId) {
        isTaskFound = true;
        return false;
      }
      return true;
    });
    if (isTaskFound) {
      fs.writeFileSync(writePath, JSON.stringify(tempTaskData), {
        encoding: "utf8",
        flag: "w",
      });
      res.status(200);
      res.send({ message: "task deleted successfully" });
    } else {
      res.status(404);
      res.send({ message: "task not found" });
    }
  } catch (err) {
    res.status(500);
    res.send({ message: "Something went wrong" });
  }
});
