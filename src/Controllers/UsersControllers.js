



//homeweb
const HomeWeb = (req,res) => {
    try{
       res.render('home', {
        title:'halaman/home',
        layout: 'main-layouts/main-layouts',
       })
}catch(err){
        console.log(err)
    }
}

//LoginWeb
const LoginWeb = (req,res) => {
    try{
        res.send('halaman login')
    }catch{
        res.send('gagal')
    }
}

//registerweb
const RegisterWeb =  (req,res) => {
    try{
        res.send('halaman register')
    }catch{
        res.send('gagal')
    }
}




module.exports = {HomeWeb,LoginWeb,RegisterWeb}