require("dotenv").config();
const express = require("express");
const Account = require("./model/account");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use("/login", express.static("loginPage"));

router.post("/login", async (req, res) => {
  const account = new Account({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  const user = await Account.find({ username: req.body.username });
  const count = await Account.find({
    username: req.body.username,
    email: req.body.email,
  }).count({ sent_at: null });

  if (count != 1) {
    res.status(400).send("wrong username / email");
  } else {
    user.forEach(async (e) => {
      if (
        (await bcrypt.compare(req.body.password, e.password)) &&
        e.account == true
      ) {
        const accessToken = generateAccessToken({ username: e.username });
        const refreshToken = jwt.sign(e.username, process.env.REFRESH_TOEKN);
        refreshTokens.push(refreshToken);
        res
          .status(200)
          .json({ accessToken: accessToken, refreshToken: refreshToken });
      } else if (e.account == false) {
        res.status(401).send("please contact the site administrator");
      } else {
        res.status(404).send("wrong password");
      }
    });
  }
});

router.post("/", async (req, res) => {
  const user = await Account.find({ username: req.body.username }).count({
    sent_at: null,
  });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const account = new Account({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    account: true,
  });

  try {
    if (user == 0) {
      const saveduser = await account.save();
      res.status(200).json(saveduser);
    } else {
      res.status(404).send("existed");
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:username", async (req, res) => {
  try {
    const user = await Account.find({ username: req.params.username , email : req.body.email}).count({sent_at: null});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    if (user > 0) {
      const updatedAccount = await Account.updateMany(
        { username: req.params.username },
        { $set: { password: hashedPassword } }
      );

      res.status(200).json(updatedAccount);
    } else {
      res.status(404).send("not existed");
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

let refreshTokens = [];

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOEKN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user });
    res.json({ accessToken: accessToken });
  });
});

router.delete("/login", async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(name) {
  return jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
}
module.exports = router;
