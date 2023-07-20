const express = require('express')
const app = express()
//UsersControllers
const {HomeWeb} = require('../Controllers/UsersControllers')



app.get('/',HomeWeb)







module.exports = app


