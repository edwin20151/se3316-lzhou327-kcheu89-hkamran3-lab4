const express = require("express");
const router = express.Router();
const Legal = require("./model/report");


router.get("/reports/", async (req, res) => {
    const reports = await Legal.find({ Public: true }).sort({"modifiedDate":-1}).limit(10);
    res.json(reports);
  });

  router.post("/reviews/:report", async (req, res) => {
    try {
      const report = await Legal.find({ name: req.params.report });
  
      res.json(report);
    } catch (err) {
      res.json({ message: err });
    }
  });

  router.get("/:report", async (req, res) => {
    try {
      const report = await Legal.find({ name: req.params.report });
  
      res.json(report);
    } catch (err) {
      res.json({ message: err });
    }
  });

  router.delete("/:report", async (req, res) => {
    try {
        const removeReport = await Legal.remove({ name: req.params.report});
        res.json(removeReport);
      } 
    catch (err) {
      res.json({ message: err });
    }
  });


  router.post('/', async (req,res)=>{
    const report = new  Legal({
        name: req.body.name,
        typeofrequest: req.body.typeofrequest,
        request_date: req.body.request_date,
        review: req.body.review
    })
  
    const report1 = await Legal.find({name : req.body.name}).count({sent_at: null});
   
     try{
        if(report1 == 0){
            const savedReview = await report.save();
            res.json(savedReview);
          
   }
    else {
        res.status(404).send('Already Submitted')
        
    }
  }
   catch(err) {
        res.json({message : err})
    }
  })
  
  module.exports = router;