const mongoose = require('mongoose')
const dotenv = require('dotenv').parse

const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express()

const indexRouter = require('./routes/index')

mongoose.connect('mongodb://localhost/mybrary')
const db = mongoose.connection
db.on('error', error =>console.error(error))
db.once('open', () => console.log('Conected'))

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.set('views', __dirname + '/views')

app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)
app.listen(process.env.PORT||3000)