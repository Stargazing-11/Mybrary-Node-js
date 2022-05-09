const mongoose = require('mongoose')
const dotenv = require('dotenv').parse

const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const app = express()

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
mongoose.connect('mongodb://localhost/mybrary')
const db = mongoose.connection
db.on('error', error =>console.error(error))
db.once('open', () => console.log('Conected'))

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.listen(process.env.PORT||3000)