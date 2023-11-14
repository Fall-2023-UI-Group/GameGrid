// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

//Connect to db
const db = require('./db');

const userRouter = require('./routes/user-router');

app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
 
    resp.send("App is Working");
    // You can check backend is working or not by
    // entering http://localhost:5000
     
    // If you see App is working means
    // backend working properly
});
 

app.use('/user', userRouter);

app.listen(5000, () => console.log("App listen at port 5000"));