require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

const accountRoute = require("./accountroute");
app.use("/account", accountRoute);

const serverRoute = require("./serverRoute");
app.use("/info", serverRoute);

const trackRoute = require("./trackroute.js");
app.use("/track", trackRoute);

const listRoute = require("./listroute.js");
app.use("/list", listRoute);

const legalRoute = require("./legalroute.js");
app.use("/report", legalRoute);

const reviewRoute = require("./reviewroute.js");
app.use("/reviews", reviewRoute);

const policyRoute = require("./policyroute.js");
app.use("/policies", policyRoute);

app.listen(5500);
