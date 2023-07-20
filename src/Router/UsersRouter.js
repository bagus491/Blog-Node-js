const express = require('express')
const app = express()
//UsersControllers
const {HomeWeb,LoginWeb,RegisterWeb} = require('../Controllers/UsersControllers')

//get
// homeWEB
app.get('/',HomeWeb)
// LoginWeb
app.get('/login',LoginWeb)
//registerWeb
app.get('/register',RegisterWeb)




module.exports = app


