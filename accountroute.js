const express = require('express');
const Account = require('./model/account');
const router = express.Router();
const bcrypt = require('bcrypt');
const account = require('./model/account');

router.use('/login', express.static('loginPage'));

router.get('/', async (req,res)=>{
    try{
        const account = await Account.find();
        res.json(account);
    }catch(err){
        res.status(500).json( {message: err.message})
    };
});


router.post('/login', async (req, res)=>{

    const account = new  Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email})


        const user = await Account.find({username : req.body.username})
        const count = await Account.find({username : req.body.username}).count({sent_at:null});
    
        if(count!=1){
        res.status(400).send('wrong username')
        }

        user.forEach(async e =>{
            if(await bcrypt.compare(req.body.password, e.password) && e.account == true){
            res.status(200).send('ok')}
            else if(e.account == false){
                res.status(401).send('please contact the site administrator')
            }
            else{
                res.status(404).send('wrong password')
               }
         })
         
    })


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


module.exports= router; 