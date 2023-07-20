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

// middleware penting jika ingin memakai middleware token sebagai pembatasan
const cookieparser = require('cookie-parser')
app.use(cookieparser('secret'))


// jsonweb token
const jwt = require('jsonwebtoken')
const secret = '!@%$DDZAW12456ASC3$^&'

//middleware token
app.use('/dasbord',(req,res,next) => {
    const token = req.headers.authorization || req.cookies.token
    if(token){
        try{
            const decoded = jwt.verify(token,secret)
            req.Username = decoded
            next()
        }catch{
            res.redirect('/login')
        }
       
    }else{
        res.redirect('/login')
    }
})


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


