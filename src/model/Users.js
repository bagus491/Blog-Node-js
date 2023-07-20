const mongoose = require('mongoose')


const users = mongoose.model('users',
   {
    Username:{
       type: String,
       require: true,
    },
    Password:{
        type: String,
        require: true,
    },
    Email:{
        type: String,
       require: true,
    },
   }
)

module.exports = users