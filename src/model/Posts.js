const mongoose = require('mongoose')

const SchemaPosts = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    Title: {
        type: String,
        require: true
    },
    Preparagraf: {
        type: String,
        require: true
    },
    Paragraf: {
        type: String,
        require: true
    },
    Avatar: {
        type: String,
        require: true
    },
    DatePosts: {
        type: String,
        require: true
    },
    Author: {
        type: String,
        require: true
    },
    Slug: {
        type:String,
        require:true
    },
    Category:{
        type:String,
        require:true
    }
})

const posts = mongoose.model('posts', SchemaPosts)


module.exports = posts