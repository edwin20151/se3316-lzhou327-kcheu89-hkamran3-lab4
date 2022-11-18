require('dotenv').config()
const express = require('express');
const Account = require('./model/account');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.use('/login', express.static('loginPage'));



router.post('/login', async (req, res)=>{

    const account = new  Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email})


        const user = await Account.find({username : req.body.username})
        const count = await Account.find({username : req.body.username , email : req.body.email}).count({sent_at:null});
        
    
        if(count!=1){
        res.status(400).send('wrong username / email')

        }
        else{
        user.forEach(async e =>{

            if(await bcrypt.compare(req.body.password, e.password) && e.account == true){
            const accessToken = generateAccessToken(e.username)
            res.status(200).json({accessToken : accessToken })
            }
        
            else if(e.account == false){
                res.status(401).send('please contact the site administrator')
            }
            else{
                res.status(404).send('wrong password')
               }
         })
        }
         
    });


    router.post('/', async (req, res)=>{

        const user = await Account.find({username : req.body.username}).count({sent_at: null});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const account = new Account ({
            username : req.body.username , 
            password : hashedPassword,
            email: req.body.email,
            account : req.body.account
        })

        try{
            if(user == 0){
                const saveduser = await account.save();
                res.json(saveduser);
                
            }
            else{
                res.status(404).send('existed')
                
            }
        }catch(err) {
            res.json({message : err})
        }
    
   })

   router.patch('/:username',async (req, res)=>{
    try{
    const user = await Account.find({username : req.params.username}).count({sent_at: null});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    if(user>0){
    const updatedAccount = await Account.updateMany({username : req.params.username},
    { $set:{password : hashedPassword }}
    );

    res.json(updatedAccount);
    }
    else{
        res.status(404).send('not existed')
    }
    }catch(err){
        res.status(401).json({message:err});
    }
});

    router.delete('/login', async(req, res)=>{
        accessToken = accessToken.filter(token => token !== req.body.token)
        res.sendStatus(204)
    })


    function generateAccessToken(name){
    return jwt.sign(name, process.env.ACCESS_TOKEN_SECRET)
    }
module.exports= router; 