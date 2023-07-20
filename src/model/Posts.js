const mongoose = require('mongoose')


const posts = mongoose.model('posts', 
{
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
}
)


module.exports = posts