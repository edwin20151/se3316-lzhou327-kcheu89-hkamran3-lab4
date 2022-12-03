const express = require("express");
const Review = require("./model/review");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const targetReview = await Review.find({
      listName: req.body.listName,
      userEmail: req.body.userEmail,
    }).count({
      sent_at: null,
    });
    if (targetReview == 0) {
      const review = new Review({
        listName: req.body.listName,
        userName: req.body.userName,
        message: req.body.message,
        rating: req.body.rating,
        userEmail: req.body.userEmail,
      });
      const savedReview = review.save();
      res.json(savedReview);
    } else {
      res
        .status(404)
        .json({ message: "You have already wrote a review for this playlist" });
    }
  } catch (err) {
    res.status(404).json({ message: "Not Found" });
  }
});

router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

router.get("/:list", async (req, res) => {
  const review = await Review.find({ listName: req.params.list });
  res.json(review);
});

router.patch("/status/", async (req, res) => {
  try {
    // Only allow 1 review for each list per user
    const updatedReview = await Review.updateOne(
      { listName: req.body.listName, userEmail: req.body.userEmail },
      { $set: { isHidden: req.body.isHidden } }
    );
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

router.post("/edit/", async (req, res) => {
  const updatedList = await Review.updateMany(
    { listName: req.params.listName, userEmail: req.body.userEmail },
    {
      $set: {
        message: req.body.message,
        rating: req.body.rating,
        creationDate: new Date(),
      },
    }
  );
  res.json(updatedList);
});

module.exports = router;
