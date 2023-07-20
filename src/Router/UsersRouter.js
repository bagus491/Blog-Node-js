const express = require('express')
const app = express()
//UsersControllers
const {HomeWeb,LoginWeb,RegisterWeb,DasbordWeb} = require('../Controllers/UsersControllers')
//auth
const UserAuth = require('../auth/Auth')
//middleware bodyparser
const bodyparser = require('body-parser')
app.set(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}))

//path
const path = require('path')
app.set('views',path.join(__dirname, '../views'))

//public file
app.use(express.static(path.join(__dirname, '../public')))

//get
// homeWEB
app.get('/',HomeWeb)
// LoginWeb
app.get('/login',LoginWeb)
//registerWeb
app.get('/register',RegisterWeb)
//dasbordweb
app.get('/dasbord',DasbordWeb)

//middleware login logout
app.use(UserAuth)


module.exports = app


