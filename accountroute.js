const express = require('express');
const Account = require('./model/account');
const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        const account = await Account.find();
        res.json(album);
        
    }catch(err){
        res.status(500).json( {message: err.message})
    }
})

module.exports= router;