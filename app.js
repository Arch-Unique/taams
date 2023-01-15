const express = require("express");
const cors = require("cors");
const sequelize = require("./config/connection");
let app = express();
app.use(cors());
app.options("*", cors());
const attendance = require("./routes/attendance");
const authcode = require("./routes/authcode");

//get db connection
//require("./config/connection");
sequelize.authenticate().catch((err) => console.log(err));
sequelize.sync({ alter: true });

const bodyParser = require("body-parser");

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//User routes
app.use("/api/attendance", attendance);
app.use("/api/authcode", authcode);

// A simple base site call
app.use(express.static(__dirname + "/public"));

module.exports = app;
