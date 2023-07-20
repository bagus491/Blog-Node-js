const express = require('express')
const app = express()
const port = 3000
const UsersRouter = require('./src/Router/UsersRouter')



//middleware view engine
const mainlayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(mainlayouts)

// usersRouter
app.use(UsersRouter)


// pembatasan
app.use('/',(req,res) => {
    res.status(404).send('404 NOT FOUND')
})


app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
})