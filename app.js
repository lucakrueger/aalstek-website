let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let hbs = require('hbs')

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let cloudRouter = require('./routes/cloud')

let app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views'))

// Middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Define Static Data
app.use(express.static(path.join(__dirname, 'public')))

// Define Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/cloud', cloudRouter)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
