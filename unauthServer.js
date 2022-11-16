require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

app.use(express.json())


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

app.get('/posts', authenticateToken,(req,res)=>{
    res.json(user.filter(users => users.name === req.post.name ))
})


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, post)=>{
        if(err) return res.sendStatus(403)
        req.post = post
        next()
    })
}
app.listen(3000)