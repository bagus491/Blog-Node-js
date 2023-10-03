const express = require('express')
const app = express()
const port = 3000
const UsersRouter = require('./src/Router/UsersRouter')

// database
require('./src/db/db')

//middleware view engine
const mainlayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(mainlayouts)

//addon
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')


app.use(morgan('dev'))

app.use(helmet())

app.use(cors(
    origin = 'http://localhost:3000'
))


// express
app.use(express.urlencoded({extended: true}))


// middleware penting jika ingin memakai middleware token sebagai pembatasan
const cookieparser = require('cookie-parser')
app.use(cookieparser('secret'))

const session = require('express-session')
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 6000}
}))

const flash = require('connect-flash')
app.use(flash())


//middleware method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


// usersRouter
app.use(UsersRouter)




// pembatasan
app.use('/',(req,res) => {
    res.status(404).send('404 NOT FOUND')
})


app.listen(port,() => {
    console.log(`server berjalan di port ${port}`)
})