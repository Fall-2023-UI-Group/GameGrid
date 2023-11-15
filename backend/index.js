const express = require('express');
const app = express();
const cors = require("cors");

// Connect to db
const db = require('./db');

const userRouter = require('./routes/user-router');
const gameRouter = require('./routes/game-router');

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    resp.send("App is Working");
});

app.use('/user', userRouter);
app.use('/game', gameRouter);

app.listen(5000, () => console.log("App listen at port 5000"));
