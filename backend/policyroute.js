const express = require("express");
const Policy = require("./model/policy");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const policies = await Policy.find();
    res.status(200).json({ policies });
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.get("/:document", async (req, res) => {
  try {
    const policy = await Policy.find({
      document: req.params.document,
    });
    res.status(200).json({ policy });
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.post("/:document", async (req, res) => {
  try {
    const policy = await Policy.find({
      document: req.params.document,
    }).count({ sent_at: null });

    if (policy > 0) {
      const updatedPolicy = await Policy.updateMany(
        { document: req.params.document },
        { $set: { content: req.body.content } }
      );
      res.status(200).json(updatedPolicy);
    } else {
      const policy = new Policy({
        document: req.params.document,
        content: req.body.content,
      });
      const savedPolicy = await policy.save();
      res.status(200).json(savedPolicy);
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

module.exports = router;
