const cors = require('cors')
const express = require('express')
const app = express()

require('./config/mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes'))
app.use('*', require('./middlewares/404'))
app.use(require('./middlewares/errorHandler'))

module.exports = app
