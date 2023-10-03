const mongoose = require('mongoose')


const SchemaUsers = new mongoose.Schema({
   username:{
      type: String,
      require: true,
   },
   password:{
       type: String,
       require: true,
   },
   Email:{
       type: String,
      require: true,
   },
   Role: {
      type: String,
      require: true
   }
})

const users = mongoose.model('users',SchemaUsers)
   
  

module.exports = users