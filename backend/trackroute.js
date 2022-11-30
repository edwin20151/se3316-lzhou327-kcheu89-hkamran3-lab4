const express = require("express");
const router = express.Router();
const Track = require("./model/track");

router.post("/search", async (req, res) => {
  const track = new Track({
    album_title: req.body.album_title,
    artist_name: req.body.artist_name,
    track_genres: req.body.track_genres,
    track_title: req.body.track_title,
  });
  const track1 = await Track.find({
    album_title: { $regex: req.body.album_title, $options: "xi" },
    track_title: { $regex: req.body.track_title, $options: "xi" },
    artist_name: { $regex: req.body.artist_name, $options: "xi" },
    track_genres: { $regex: req.body.track_genres, $options: "xi" },
  }).limit(20);

  res.json(track1);
});

module.exports = router;
