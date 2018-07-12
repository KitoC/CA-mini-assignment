const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()



app.use(bodyParser.json())

app.use(cors())

mongoose.connect('mongodb://admin:admin123@ds125871.mlab.com:25871/url-bookmarks-coderacademy', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected successfully.')
});


app.use('/users', require('./User/routes') )
app.use('/posts', require('./Post/routes') )
app.use('/topics', require('./Topic/routes') )


app.listen(3000, () => console.log('app listening on port 3000'))

module.exports = app
