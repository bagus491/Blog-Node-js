const express = require('express')
const app = express()


app.post('/register',(req,res) => {
    res.send(req.body)
})




module.exports = app