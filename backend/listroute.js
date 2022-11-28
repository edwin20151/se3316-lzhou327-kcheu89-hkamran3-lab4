const express = require('express');
const router = express.Router();
const List = require('./model/list');

router.get('/', async (req,res)=>{
    const lists = await List.find({Public : true})
    res.json(lists)
});

router.post('/:list', async (req,res)=>{
    try{
      
        const list = await List.find({name : req.params.list});
        
        res.json(list);

      
    }catch(err){
        res.json({message: err});
};
});

router.get('/private', async (req,res)=>{
    const lists = await List.find({Public : false})
    res.json(lists)
});



router.patch('/:track',async (req, res)=>{
    try{
    const list = await List.find({name : req.params.track}).count({sent_at: null});
    if(list>0){
    const updatedList = await List.updateMany({name : req.params.track},
    { $set:{tracks : req.body.tracks }}
    );

    res.json(updatedList);
    }
    else{
        res.status(404).send('not existed')
    }
    }catch(err){
        res.status(404).json({message:err});
    }
});

router.delete('/:list', async (req,res)=>{
    try{
      
        const list = await List.find({name : req.params.track}).count({sent_at: null});
        
        if(list>0){
            const removeList = await List.remove({name : req.params.track})
            res.json(removeList);
            }
            else{
                res.status(404).send('not existed')
            }
        }catch(err){
            res.json({message: err});
        }
        });

router.patch('/review/:track',async (req, res)=>{
    try{
        const list = await List.find({name : req.params.track}).count({sent_at: null});
        if(list>0){
        const updatedList = await List.updateMany({name : req.params.track},
        { $set:{reviews : req.body.reviews }}
        );
        
        res.json(updatedList);
        }
        else{
            res.status(404).send('not existed')
        }
        }catch(err){
            res.status(404).json({message:err});
        }
    });


module.exports= router;