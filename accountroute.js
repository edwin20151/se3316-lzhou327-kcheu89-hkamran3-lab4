const express = require('express');
const Account = require('./model/account');
const router = express.Router();

router.post('/login', async (req, res)=>{

    const account = new  Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email})
    try{
        const count = await Account.find({username : req.body.username , passsword : req.body.passsword}).count({sent_at:null});
        
        if(count==1){
        res.json('correct');}
        else{
            res.status(404).send('something wrong')
        }


    }catch(err){
        res.status(500).json( {message: err.message})
    };
    })


module.exports= router;