const {getPosts,getPost,} = require('../utils/flowdb')


//homeweb
const HomeWebView = async (req,res) => {
    const getPost = await getPosts()
    try{
       res.render('home', {
        title:'halaman/home',
        layout: 'main-layouts/main-layouts',
        getPost
       })
}catch(err){
       res.status(500).send({msg : 'Internal Server Error'})
    }
}

//getoneSearch
const GetOneSearch = async (req,res) => {
    const search = req.query.search
    const getPost = await Posts.findOne({Title: search})
    if(getPost){
        try{
            res.render('homesearch', {
             title:'halaman/home',
             layout: 'main-layouts/main-layouts',
             getPost
            })
     }catch(err){
             console.log(err)
         }
    }else{
        res.redirect('/')
    }
}

//readblog
const ReadBlogView = async (req,res) => {
    const slug = req.params.slug
    const getOne = await getPost(slug)
    try{
        res.render('dasbord-readblog', {
            title:'halaman/readblog',
            layout: 'main-layouts/main',
            getPost: getOne
        })
    }catch(err){
        res.send('gagal')
    }
}

//LoginWeb
const LoginWebView = (req,res) => {
    try{
        res.render('login', {
            title: 'halaman/login',
            layout: 'login.ejs',
            msg: req.flash('msg')
        })
    }catch(err){
        res.send('gagal')
    }
}

//registerweb
const RegisterWebView =  (req,res) => {
    try{
       res.render('register', {
        title: 'halaman/register',
        layout: 'register.ejs'
       })
    }catch(err){
        res.send('gagal')
    }
}

//dasbord
const DasbordWebView = async (req,res) => {
    try{
        const Role = req.session.role
        const User = req.session.user
        res.render('main_dasbord', {
            title: 'halaman/dasbord',
            layout: 'main-layouts/main',  
            Role ,
            User
        })
    }catch(err){
        res.send('gagal')
    }
}

//mypost
const DasbordMyPosts = async (req,res) => {
    const getMany = await getPosts()
    const User = req.session.user
    const posts = getMany.filter((e) => e.username === User)
    try{
        res.render('mypost_dasbord',{
            title: 'halaman/myposts',
            layout: 'main-layouts/main.ejs',
            getPosts: posts,
            msg : req.flash('msg')
        })
    }catch(err){
        res.send('gaga;')
    }
}

//dasbordpost 
const DasbordPostView = (req,res) => {
    try{
        res.render('addpost', {
            title: 'halaman/addpost',
            layout: 'main-layouts/main.ejs',
        })
    }catch(err){
        res.send('gagal')
    }
}

//updatepost
const DasbordUpdateView = async (req,res) => {
    const slug = req.params.slug
    const getOne = getPost(slug)
    try{
        res.render('updatepost', {
            title: 'halaman/updateposts',
            layout: 'updatepost.ejs',
            getPost: getOne
        })
    }catch(err){
        res.send('gagal')
    }
}


module.exports = {HomeWebView,LoginWebView,RegisterWebView,DasbordWebView,DasbordPostView,DasbordUpdateView,ReadBlogView,GetOneSearch,DasbordMyPosts}