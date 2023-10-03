const express = require('express')
const app = express()

//validator 
const {validationResult} = require('express-validator')

//verify.js
const {checkToken,jwt,secret,verifyData} = require('../utils/verify')

//flowdb
const {addUserSchema,getUser} = require('../utils/flowdb')

//view engine
const path = require('path')
app.set('views',path.join(__dirname, '../views'))

//bycrpt
const bycrpt = require('bcrypt')
const salt = bycrpt.genSaltSync(10)

//passport
const passport = require('passport')
const LocalPassport = require('passport-local').Strategy

//url


passport.use(new LocalPassport({usernameField: 'username'}, async(username,password,done) => {
    try{
        //checkUser
        const CheckUser = await getUser(username)
        if(!CheckUser){
            return done(null,false,{message: 'username not valid'})
        }

        //checkPassword
        const validPass = bycrpt.compareSync(password,CheckUser.password)
        if(!validPass){
            return done(null,false,{message:'password not valid'})
        }


        // if lolos
        return done(null,CheckUser)
    }catch(error){
        return done(null,error)
    }
}))

passport.serializeUser((CheckUser,done) => {
         done(null,CheckUser.username)
})

passport.deserializeUser(async (username,done) =>{
    try{
        const CheckUser = await getUser(username)
        if(!CheckUser){
            return done(null,CheckUser)
        }
    }catch(error){
        return done(null,error)
    }
})

app.use(passport.initialize())
app.use(passport.session())


const doRegister = async (req,res) =>{
    try{
        const error = validationResult(req)
        const {username,password,Email} = req.body

        if(!error.isEmpty()){
            return res.render('register',{
                title: 'halaman/login',
                layout: 'register.ejs',
                error: error.array()
            })
        }

        // bcrypt
        let newPass = bycrpt.hashSync(password,salt)

        //role
        let Role = 'member'

        const postUser = await addUserSchema(username,newPass,Email,Role)

        const saveUser = await postUser.save()

        if(!saveUser)
        {
            req.flash('msg','unpexted error')
            return res.redirect('/register')
        }

        req.flash('msg','success register')
        res.redirect('/login')
    }catch(error){
        res.status(500).send({msg:'internal Server Error'})
    }
}

app.post('/register',verifyData,doRegister)


// do login
const doLogin = (req,res) => {
    try{
        const {username} = req.body

        jwt.sign({username},secret,{expiresIn: '1h'},async (err,token) => {
            if(err)return res.status(401).send({msg:'internal Server Error'});

            const User = await getUser(username)

            if(!User)
            {
                return res.status(401).send({msg:'internal Server Error'});
            }
            
            req.session.user = username;
            req.session.role = User.Role
            res.cookie('auth_token',token,{httpOnly:true})
            res.redirect('/dasbord')

        })
    }catch(error){
        res.status(500).send({msg:'internal Server Error'})
    }
} 

app.post('/login',passport.authenticate('local',{failureRedirect: '/login'}),doLogin)

module.exports = app