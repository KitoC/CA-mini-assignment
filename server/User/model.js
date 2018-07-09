const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
    role: String,
    firstName: String,
    lastName: String,
    handle: String
})

User.plugin(passportLocalMongoose, {usernameField: 'email' })

module.exports = mongoose.model('User', User)
