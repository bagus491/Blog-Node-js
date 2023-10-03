const express = require('express')
const app = express()
//UsersControllers
const {HomeWebView,LoginWebView,RegisterWebView,DasbordWebView,DasbordPostView,DasbordUpdateView,ReadBlogView,GetOneSearch,DasbordMyPosts} = require('../Controllers/UsersControllers')
//auth
const UserAuth = require('../auth/Auth')
//post
const {doAddPost,doDeletePost} = require('../Controllers/PostController')

//check
const {checkToken} = require('../utils/verify')

//path
const path = require('path')
app.set('views',path.join(__dirname, '../views'))



//middleware view engine
const mainlayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(mainlayouts)

//public file
app.use(express.static(path.join(__dirname, '../public')))


//multer
const multer = require('multer')
const Upload = multer({dest: 'uploads/'})




//middleware uploads
// kenapa gak ada namanayA? karena ada uploads di dalam databasenye atau req.file.pathnya
app.use(express.static(path.join(__dirname, '../../')))


//getUser
const {getUser} = require('../utils/flowdb')


// middleware token
app.use('/dasbord',async (req,res,next) => {
    //checkSession

    const token = req.cookies.auth_token
    if(!token)
    {
        return res.redirect('/login')
    }

    const checked = checkToken(token)
    if(!checked)
    {
        return res.redirect('/login')
    }

    // checkUser
    const CheckUser = await getUser(checked)

    if(!CheckUser)
    {
        return res.redirect('/login')
    }

    req.session.role = CheckUser.Role
    req.session.user = CheckUser.username

    next()
})


//get
// homeWEB
app.get('/',HomeWebView)
// LoginWeb
app.get('/login',LoginWebView)
//registerWeb
app.get('/register',RegisterWebView)



//dasbordweb
app.get('/dasbord',DasbordWebView)
//dasbordpost
app.get('/dasbord/addpost',DasbordPostView)
//post
app.post('/dasbord/addpost',Upload.single('Avatar'),doAddPost)
// allpost
app.get('/dasbord/myposts',DasbordMyPosts)

// updateposts
app.get('/dasbord/updatepost/:id',DasbordUpdateView)


//readblog
app.get('/dasbord/detail/:slug',ReadBlogView)





// search
app.get('/searchpost', GetOneSearch)





//updatepost
app.put('/dasbord/updatepost',Upload.single('Avatar'),(req,res) => {
    const token = req.cookies.token
    const imageUrl = req.file.path
    const {Title,Preparagraf,Paragraf,Author} = req.body
    const DatePosts = new Date()
    if(token){
        Posts.updateMany(
            {
                _id: req.body._id
            },
            {
                $set: {
                    Title,
                    Preparagraf,
                    Paragraf,
                    Avatar: imageUrl,
                    DatePosts,
                    Author,
                }
            }
        ).then((err,result) => {
            res.redirect('/dasbord')
        })
    }else{
        res.redirect('/dasbord')
    }
})

//delete
app.delete('/dasbord/delete', doDeletePost)

//logoutweb
app.get('/logout',(req,res) => {
    res.clearCookie('token')
    res.redirect('/login')
})

//middleware login logout
app.use(UserAuth)


module.exports = app


