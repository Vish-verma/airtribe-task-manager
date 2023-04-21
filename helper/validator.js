class validator {
    static validateTaskInfo(taskInfo, taskData) {
      if(taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("isCompleted") &&
        taskInfo.hasOwnProperty("id") && 
        taskInfo.hasOwnProperty("priority") && 
        this.validateUniqueTaskId(taskInfo, taskData)) {
          return {
            "status": true,
            "message": "Task has been added"
          };
        }
        if(!this.validateUniqueTaskId(taskInfo, taskData)){
          return {
            "status": false,
            "message": "Task id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "Task Info is malformed please provide all the properties"
        }
    }
  
    static validateTaskObj(taskInfo){
        if(taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("isCompleted") &&
        taskInfo.hasOwnProperty("id") && 
        taskInfo.hasOwnProperty("priority")){
            return {
                "status": true,
                "message": "Task has been updated"
              };
        }
        return {
            "status": false,
            "message": "Task Info is malformed please provide all the properties"
          }
    }
    static validateUniqueTaskId(taskInfo, taskData) {
      let valueFound = taskData.tasks.some(el => el.id === taskInfo.id);
      if(valueFound) return false;
      return true;
    }
  
    static validateIsCompleted(taskInfo) {
      if(taskInfo.hasOwnProperty("isCompleted") && typeof taskInfo['isCompleted'] == "boolean") {
        return true;
      }
      return false;
    }
  }
  
  module.exports = validator;