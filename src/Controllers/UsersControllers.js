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
    const getOne = getPost(slug)
    try{
        res.render('readblog', {
            title:'halaman/readblog',
            layout: 'main-layouts/main-layouts',
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
    const getMany = await getPosts()
    try{
        res.render('dasbord', {
            title: 'halaman/dasbord',
            layout: 'dasbord.ejs',
            getPosts: getMany
        })
    }catch(err){
        res.send('gagal')
    }
}

//dasbordpost 
const DasbordPostView = (req,res) => {
    try{
        res.render('addpost', {
            title: 'halaman/addpost',
            layout: 'addpost.ejs'
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


module.exports = {HomeWebView,LoginWebView,RegisterWebView,DasbordWebView,DasbordPostView,DasbordUpdateView,ReadBlogView,GetOneSearch}