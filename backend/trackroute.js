const express = require('express');
const router = express.Router();
const Track = require('./model/track');


router.get('/genre/:genreId', async (req,res)=>{
    try{
        const track = await Track.find({track_genres : {$regex : req.params.genreId}});
        res.json(track); 
    }catch(err){
        res.json({message: err});
};
});




router.get('/band/:bandId', async (req,res)=>{
    try{
        const track = await Track.find({album_title : {$regex: req.params.bandId}});
        res.json(track);
    }catch(err){
        res.json({message: err});
};
});

router.get('/track/:trackId', async (req,res)=>{
    try{
        const track = await Track.find({track_title: {$regex:req.params.trackId}});
        res.json(track);
    }catch(err){
        res.json({message: err});
};
});



router.get('/artist/:artistId', async (req,res)=>{
    try{
        const track = await Track.find({artist_name: {$regex:req.params.artistId}});
        res.json(track);
        
    }catch(err){
        res.json({message: err});
};
});



module.exports= router;