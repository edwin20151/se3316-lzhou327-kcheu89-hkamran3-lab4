require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true} )
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', ()=> console.log('connected to database'));

app.use(express.json())


const accountRoute = require('./accountroute');
app.use('/account', accountRoute);


const user = [
    {
        name: 'edwin',
        title : 'user 1'
    },
    {
        name: 'jon',
        title : 'user 2'
    },
]

app.get('/posts',(req,res)=>{
    res.json(user.filter(users => users.name === req.post.name ))
})

app.post('/login', (req, res)=>{


    const username = req.body.username;
    const user = {name : username}

    const accesstoken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
    res.json({accesstoken : accesstoken , refreshToken : refreshToken})
})


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '15s'})
}
app.listen(3000)