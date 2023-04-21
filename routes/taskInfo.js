//required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const validator = require("../helper/validator");
//Tasks Data
const tasksData = require("../data/tasks.json");

//router initialization
const router = express.Router();

//get all tasks
router.get("/", (req, res) => {
  try {
    let { sortBy, orderBy, filterBy , filterValue } = req.query;
    let airtribeTasks = tasksData.tasks;

    if (sortBy) {
      if (orderBy == "desc") {
        airtribeTasks = airtribeTasks.sort((task1, task2) => {
          let d1 = new Date(task1.created_at);
          let d2 = new Date(task2.created_at);
          return d2 - d1;
        });
      } else {
        airtribeTasks = airtribeTasks.sort((task1, task2) => {
          let d1 = new Date(task1.created_at);
          let d2 = new Date(task2.created_at);
          return d1 - d2;
        });
      }
    }
    if(filterBy) {
      if(filterValue == 'true'){
        airtribeTasks = airtribeTasks.filter((task1) => task1.isCompleted);
      }else {
        airtribeTasks = airtribeTasks.filter((task1) => !task1.isCompleted);
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
router.get("/:taskId", (req, res) => {
  try {
    let airtribeTasks = tasksData.tasks;
    let { taskId } = req.params;
    let result = airtribeTasks.find((task) => task.id == taskId);
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
router.post("/", (req, res) => {
  try {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, "../data", "tasks.json");

    let validationObj = validator.validateTaskInfo(taskDetails, tasksData).status
    if (validationObj.status) {
      let tempTaskData = { ...tasksData };
      tempTaskData.tasks.push(taskDetails);
      fs.writeFileSync(writePath, JSON.stringify(tempTaskData), {
        encoding: "utf8",
        flag: "w",
      });
      res.status(200);
      res.json({message:validationObj.message});
    } else {
      res.status(400);
      res.json(validator.validateTaskInfo(taskDetails, tasksData));
    }
  } catch (err) {
    console.log("err",err);
    res.status(500);
    res.send({ message: "Something went wrong",...err });
  }
});

//update a task
router.put("/:taskId", (req, res) => {
  try {
    const taskDetails = req.body;
    const { taskId } = req.params;
    let writePath = path.join(__dirname, "../data", "tasks.json");
    let validateObj = validator.validateTaskObj(taskDetails);
    if (validateObj.status) {
      let tempTaskData = { ...tasksData };
      let isFound = false;
      if(taskId != taskDetails.id){
        res.status(400);
        res.json({message:"something seems suspicious"});
        return;
      }
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
router.delete("/:taskId", (req, res) => {
  try {
    const { taskId } = req.params;
    let writePath = path.join(__dirname, "../data", "tasks.json");
    let tempTaskData = { ...tasksData };

    let isTaskFound = false;
    tempTaskData.tasks = tempTaskData.tasks.filter((item) => {
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

module.exports = router;