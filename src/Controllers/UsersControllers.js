//model POSTS
const Posts = require('../model/Posts')



//homeweb
const HomeWeb = async (req,res) => {
    const getPost = await Posts.find()
    try{
       res.render('home', {
        title:'halaman/home',
        layout: 'main-layouts/main-layouts',
        getPost
       })
}catch(err){
        console.log(err)
    }
}

//LoginWeb
const LoginWeb = (req,res) => {
    try{
        res.render('login', {
            title: 'halaman/login',
            layout: 'login.ejs'
        })
    }catch{
        res.send('gagal')
    }
}

//registerweb
const RegisterWeb =  (req,res) => {
    try{
       res.render('register', {
        title: 'halaman/register',
        layout: 'register.ejs'
       })
    }catch{
        res.send('gagal')
    }
}

//dasbord
const DasbordWeb = async (req,res) => {
    const getPosts = await Posts.find()
    try{
        res.render('dasbord', {
            title: 'halaman/dasbord',
            layout: 'dasbord.ejs',
            getPosts
        })
    }catch{
        res.send('gagal')
    }
}

//dasbordpost 
const DasbordPost = (req,res) => {
    try{
        res.render('addpost', {
            title: 'halaman/addpost',
            layout: 'addpost.ejs'
        })
    }catch{
        res.send('gagal')
    }
}

//updatepost
const DasbordUpdate = async (req,res) => {
    const getPost = await Posts.findOne({_id: req.params.id})
    try{
        res.render('updatepost', {
            title: 'halaman/updateposts',
            layout: 'updatepost.ejs',
            getPost
        })
    }catch{
        res.send('gagal')
    }
}


module.exports = {HomeWeb,LoginWeb,RegisterWeb,DasbordWeb,DasbordPost,DasbordPost,DasbordUpdate}