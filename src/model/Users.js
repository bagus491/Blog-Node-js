const mongoose = require('mongoose')


const users = mongoose.model('users',
   {
    Username:{
        Type: String,
        require: true
    },
    Password:{
        Type: String,
        require: true
    },
    Email:{
        Type: String,
        require: true
    },
   }
)

module.exports = users