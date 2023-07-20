const express = require('express')
const app = express()
//UsersControllers
const {HomeWeb,LoginWeb,RegisterWeb,DasbordWeb,DasbordPost} = require('../Controllers/UsersControllers')
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

//multer
const multer = require('multer')
const Upload = multer({dest: 'uploads/'})

//model POSTS
const Posts = require('../model/Posts')

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
//dasbordpost
app.get('/dasbord/addpost',DasbordPost)



//post
app.post('/addpost',Upload.single('Avatar'),(req,res) => {
   const token = req.cookies.token
   const ImageUrl = req.file.path
   const {Title,Preparagraf,Paragraf,Author} = req.body
   const DatePosts = new Date()
   if(token){
     Posts.insertMany(
        {
            Title,
            Preparagraf,
            Paragraf,
            Avatar: ImageUrl,
            DatePosts,
            Author,
        }
     ).then((err,result)=>{
        res.redirect('/dasbord')
     })
   }else{
    res.redirect('/login')
   }
})



//logoutweb
app.get('/logout',(req,res) => {
    res.clearCookie('token')
    res.redirect('/login')
})

//middleware login logout
app.use(UserAuth)


module.exports = app


