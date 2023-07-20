const express = require('express')
const app = express()
const port = 3000




app.get('/', (req,res) => {
    res.send('hello world')
})



// pembatasan
app.use('/',(req,res) => {
    res.status(404).send('404 NOT FOUND')
})


app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
})