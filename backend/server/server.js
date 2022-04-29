const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: '*'}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection esatblished successfully");
});

// /SummerGame/athlete_sport

const athletesRouter = require('./routes/athletes');
// if we go to /athletes all athletes will load 
app.use('/athletes', athletesRouter);

const scheduleRouter = require('./routes/schedule');
app.use('/schedule', scheduleRouter);

const medalsRouter = require('./routes/medals');
app.use('/medals', medalsRouter);

app.listen(port, () => {
  // perform a database connection when server start
  console.log(`Server is running on port: ${port}`);
});

/*
  1. Connect to db
  2. Pull data 

*/
