const express = require('express')
const app = express()

//validator 
const {body ,validationResult} = require('express-validator')

//model users
const Users = require('../model/Users')

//view engine
const path = require('path')
app.set('views',path.join(__dirname, '../views'))

//bycrpt
const bycrpt = require('bcrypt')
const salt = bycrpt.genSaltSync(10)

//jsonwebtoken
const jwt = require('jsonwebtoken')
const secret = '!@%$DDZAW12456ASC3$^&'

//cookie-parser
const cookieparser = require('cookie-parser')
app.use(cookieparser('secret'))

app.post('/register', [
    body('Username').custom(async (value) => {
        const duplikat = await Users.findOne({Username: value})
        if(duplikat){
            throw new Error('Username Telah Tersedia')
        }else{
            return true
        }
    }),
    body('Password').isLength({min: 5}).withMessage('Panjang Password minimal 5'),
    body('Email').isEmail().withMessage('Email Tidak Valid')
],(req,res) => {
    const error = validationResult(req)
    const {Username,Password,Email} = req.body
    if(!error.isEmpty()){
        res.render('register',{
            title: 'halaman/login',
            layout: 'login.ejs',
            error: error.array()
        })
    }else{
        Users.insertMany(
            {
                Username,
                Password: bycrpt.hashSync(Password,salt),
                Email,
            }
        ).then((err,result) => {
            res.redirect('/login')
        })
    }
})

app.post('/login', [
    body('Username').custom(async (value) => {
        const getName = await Users.findOne({Username: value})
        if(!getName){
            throw new Error('Username Tidak ditemukan')
        }else{
            return true
        }
    }),
], async (req,res) => {
    const error = validationResult(req)
    const {Username,Password,Email} = req.body
    if(!error.isEmpty()){
        res.render('login',{
            title: 'halaman/login',
            layout: 'login.ejs',
            error: error.array()
        })
    }else{
        const dataOk = await Users.findOne({Username})
        if(dataOk){
            const PassOk = bycrpt.compareSync(Password,dataOk.Password)
            if(PassOk){
                jwt.sign({Username: dataOk.Username},secret,{expiresIn: '1h'}, (err,token) => {
                    if(err) throw new err;
                    res.cookie('token',token)
                    res.redirect('/dasbord')
                })
            }else{
                  res.redirect('/login')
            }
        }
    }
})


module.exports = app