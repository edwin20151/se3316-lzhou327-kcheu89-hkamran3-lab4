const express = require("express");
const router = express.Router();
const List = require("./model/list");
const Track = require("./model/track")

// Get all Public lists
router.get("/public/", async (req, res) => {
  const lists = await List.find({ Public: true }).sort({"modifiedDate":-1}).limit(10);
  res.json(lists);
});

//expand all pulic and private list #dont change it

router.post("/public/:list", async (req, res) => {
  try {
    const list = await List.find({ name: req.params.list });

    res.json(list);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:list", async (req, res) => {
  try {
    const list = await List.find({ name: req.params.list });
    res.json(list);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get private lists for a user
router.get("/private/:email", async (req, res) => {
  const lists = await List.find({ Public: false, userEmail: req.params.email }).limit(20).sort({"modifiedDate" : -1});
  res.json(lists);
});

router.post("/edit/:track", async (req, res) => {
  try {
    const track1 =  await Track.find({ track_title : req.body.tracks })
    const track = await Track.find({ track_title : req.body.tracks }).count({
      sent_at: null})

      const list = await List.find({ name: req.params.track }).count({
        sent_at: null});
    if (list > 0 && track>0 ) {
      let tracks_duration = 0;
     for(let i = 0 ; i < track1.length; i++){
      const durArr = track1[i].track_duration.split(":")
      tracks_duration += parseInt(durArr[0]) * 60 + parseInt(durArr[1])
     }
     
     const m = Math.floor(tracks_duration / 60)
     const s = tracks_duration - m * 60
     const time = m.toString() + ":" + s.toString();
  
      const updatedList = await List.updateMany(
        { name: req.params.track },
        { $set: { name: req.body.name,

          tracks: req.body.tracks,
          playtime: time,
          Public: req.body.Public,
          description : req.body.description} }
      );
      res.json(updatedList);
        }else {
            res.status(404).send("not existed");
          }
         } 
   catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:list", async (req, res) => {
  try {
      const removeList = await List.remove({ name: req.params.list});
      res.json(removeList);
    } 
  catch (err) {
    res.json({ message: err });
  }
});

router.patch("/review/:list", async (req, res) => {
  try {
  
      const updatedList = await List.updateMany(
        { name: req.params.list },
        { $set: { reviews: req.body.reviews,
        rating : req.body.rating } }
      );

      res.json(updatedList);
    
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post('/', async (req,res)=>{


  const list1 = await List.find({name : req.body.name}).count({sent_at: null});

  const track = await Track.find({ track_title : req.body.tracks }).count({
    sent_at: null})

    const track1 = await Track.find({ track_title : req.body.tracks })
    
    let tracks_duration = 0;
    for(let i = 0 ; i < track1.length; i++){
     const durArr = track1[i].track_duration.split(":")
     tracks_duration += parseInt(durArr[0]) * 60 + parseInt(durArr[1])
    }
    
    const m = Math.floor(tracks_duration / 60)
    const s = tracks_duration - m * 60
    const time = m.toString() + ":" + s.toString();

      const list = new  List({
        name: req.body.name,
        creator: req.body.creator,
        playtime: time,
        tracksNum: req.body.tracksNum,
        tracks:  req.body.tracks,
        userEmail: req.body.userEmail,
        Public: req.body.Public,
        description : req.body.description
    })
    try{
      if(list1 == 0 && track > 0){
          const savedList =  list.save();
          res.json(savedList);
        
 }
  else {
      res.status(404).send('existed')
      
  }
}
 catch(err) {
      res.json({message : err})
  }
})
      
  
   

module.exports = router;
