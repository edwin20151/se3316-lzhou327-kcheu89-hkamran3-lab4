const express = require('express');
const list = require('./model/list');
const router = express.Router();
const List = require('./model/list');
const Track = require('./model/track')

router.get('/', async (req,res)=>{
    List.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.get('/:list', async (req,res)=>{
    try{
      
        const list = await List.find({name : req.params.list});
        
        res.json(list);

      
    }catch(err){
        res.json({message: err});
};
});


/*router.post('/', async (req,res)=>{
    const track = new  Track({
        track_id: req.body.track_id,
        album_id: req.body.album_id,
        album_title: req.body.album_title,
        artist_id: req.body.artist_id,
        artist_name: req.body.artist_name,
        tags: req.body.tags,
        track_date_created: req.body.track_date_created,
        track_date_recorded: req.body.track_date_recorded,
        track_duration: req.body.track_duration,
        track_genres: req.body.track_genres,
        track_number: req.body.track_number,
        track_title: req.body.track_title,
    })

    const track1 = await Track.find({track_title : req.body.track_title}).count({sent_at: null});
   
     try{
       
        if(track1 == 0){
            const savedTrack = await track.save();
            res.json(savedTrack);
          
   }
    else{
        res.status(404).send('existed')
        
    }
}
   catch(err) {
        res.json({message : err})
    }
})*/


module.exports= router;