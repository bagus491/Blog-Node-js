// jsonweb token
const jwt = require('jsonwebtoken')
const secret = '!@%$DDZAW12456ASC3$^&'



const checkToken = (token) => {
    try{
       return jwt.verify(token,secret,(err,decoded) => {
            if(err)return false;

            const decodedUser = decoded.username

            return decodedUser
        })
    }catch(error){
        return false
    }
}


// express-validator
const {body} = require('express-validator')

//checkUser
const {getUser} = require('../utils/flowdb')

const verifyData = [
    body('username').custom(async (value) => {
        const duplikat = await getUser(value)
        if(duplikat){
            throw new Error('username Telah Tersedia')
        }else{
            return true
        }
    }),
    body('password').isLength({min: 5}).withMessage('Panjang Password minimal 5'),
    body('Email').isEmail().withMessage('Email Tidak Valid')
]




module.exports = {jwt,secret,checkToken,verifyData}