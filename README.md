# airtribe-task-manager

The functionalities supported

1. Add the task
2. View all the task
3. View all task in sorted order by creation date or filtered by completionStatus
4. View details of a particular task
5. Modify the details of a task
6. Delete A task

packages to be installed

body-parser cors express

Commands to be run

Installing the packages - <strong>npm install</strong>

Starting the server - <strong>npm start</strong>

The Curls to see the functionalities

1. ADD : curl --location --request POST 'http://localhost:3000/tasks/' \
--header 'Content-Type: application/json' \
--data-raw '{
      "title": "VS code",
      "description": "IDE",
      "isCompleted": true,
      "id": 4,
      "created_at": "2023-05-12"
    }'
2. View All Task : curl --location --request GET 'http://localhost:3000/tasks'
3. View all task in sorted order by creation date or filtered by completion status (you can order by "asc" | "desc"): curl --location --request GET 'http://localhost:3000/tasks?sortBy=createdAt&orderBy=desc&filterBy=isCompleted&filterValue=false'
4. View details of a particular task : curl --location --request GET 'http://localhost:3000/tasks/1'
5. Modify the details of a task : curl --location --request PUT 'http://localhost:3000/tasks/3' \
--header 'Content-Type: application/json' \
--data-raw '{
      "title": "post man",
      "description": "CURL ",
      "isCompleted": true,
      "id": 3,
      "created_at": "2023-05-12"
    }'
6. Delete A task : curl --location --request DELETE 'http://localhost:3000/tasks/3'