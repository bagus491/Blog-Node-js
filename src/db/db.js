const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/myblog'


mongoose.connect(url,{
    useCreateIndex: true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then((err,res) => {
    console.log('berhasil terhubung ke database')
})