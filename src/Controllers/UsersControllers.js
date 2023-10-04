const {getPosts,getPost,getUsers,} = require('../utils/flowdb')


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
        const search = req.query.search_query
        const Role = req.session.role
        const User = req.session.user
        const getMany = await getPosts()


        if(search === '')
        {
            return res.redirect('/dasbord')
        }

        if(search)
        {
            const filterPosts = getMany.filter((e) => e.Title.toLowerCase().includes(search.toLowerCase()))
            

            return  res.render('main_dasbord', {
                title: 'halaman/dasbord',
                layout: 'main-layouts/main',  
                Role ,
                User,
                getPosts: filterPosts,
                
            })
        }


        res.render('main_dasbord', {
            title: 'halaman/dasbord',
            layout: 'main-layouts/main',  
            Role ,
            User,
            getPosts: getMany,
        })
    }catch(err){
        res.send('gagal')
    }
}

const AdminView = async (req,res) => {
    try{
         const search = req.query.search_query
        const Users = await getUsers()
        const Role = req.session.role
        const User = req.session.user

    
        if(!Role)
        {
            return redirect('/dasbord')
        }
        
        if(search === '')
        {
            return res.redirect('/dasbord/admin')
        }

        if(search)
        {
            const filterUsers = Users.filter((e) => e.username.toLowerCase().includes(search.toLowerCase()) || e.Role.toLowerCase().includes(search.toLowerCase()))
           
            return res.render('panel_dasbord',{
                title: 'halaman/admin',
                layout: 'main-layouts/main',
                User,
                Role,
                Users : filterUsers
            })
        }


        res.render('panel_dasbord',{
            title: 'halaman/admin',
            layout: 'main-layouts/main',
            User,
            Role,
            Users
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


module.exports = {HomeWebView,LoginWebView,RegisterWebView,DasbordWebView,DasbordPostView,DasbordUpdateView,ReadBlogView,DasbordMyPosts,AdminView}