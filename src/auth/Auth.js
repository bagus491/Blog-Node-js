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




module.exports = app