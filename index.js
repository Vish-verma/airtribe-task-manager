const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
// const taskInfo = require('./routes/taskInfo');

const routes = express.Router();

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
    }
);