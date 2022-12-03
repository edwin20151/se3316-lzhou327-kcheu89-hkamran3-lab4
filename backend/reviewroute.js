const express = require("express");
const Review = require("./model/review");
const router = express.Router();

router.post("/:list", async (req, res) => {
  try {
    const updatedReview = await Review.updateMany(
      { listName: req.params.list },
      { $push: { reviews: req.body.reviews, rating: req.body.rating } }
    );

    res.json(updatedReview);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/:list", async (req, res) => {
  const review = await List.find({ listName: req.params.list });
  res.json(review);
});

module.exports = router;
