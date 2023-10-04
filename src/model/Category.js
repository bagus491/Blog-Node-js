const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true
        },
        Slug: {
            type:String,
            require: true
        }
    }
)


const categories = mongoose.model('categories',CategorySchema)


module.exports = categories