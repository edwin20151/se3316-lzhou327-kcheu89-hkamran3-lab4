const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Account = require("./model/account");


router.get("/account", authenticateToken, async (req, res) => {
  const user1 = await Account.find({ username: req.user.name.username});
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

module.exports = router;

