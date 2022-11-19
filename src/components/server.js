require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Account = require("../model/account");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.get("/account", authenticateToken, async (req, res) => {
  const user1 = await Account.find({ username: req.user.name.username });
  res.json(user1);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.listen(5500);
