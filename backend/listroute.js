const express = require("express");
const router = express.Router();
const List = require("./model/list");

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
  const lists = await List.find({ Public: false, userEmail: req.params.email }).limit(20);
  res.json(lists);
});

router.patch("/:track", async (req, res) => {
  try {
    const list = await List.find({ name: req.params.track }).count({
      sent_at: null,
    });
    if (list > 0) {
      const updatedList = await List.updateMany(
        { name: req.params.track },
        { $set: { name: req.body.name,
        
          playtime: req.body.playtime,

          tracks: req.body.tracks,
          
          Public: req.body.Public,
          description : req.body.description} }
      );

      res.json(updatedList);
    } else {
      res.status(404).send("not existed");
    }
  } catch (err) {
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
  const list = new  List({
      name: req.body.name,
      creator: req.body.creator,
      playtime: req.body.playtime,
      tracksNum: req.body.tracksNum,
      tracks: req.body.tracks,
      userEmail: req.body.userEmail,
      Public: req.body.Public,
      description : req.body.description
  })

  const list1 = await List.find({name : req.body.name}).count({sent_at: null});

 
   try{
      if(list1 == 0){
          const savedList = await list.save();
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
