const mongoose = require('mongoose')
const Schema = mongoose.Schema



const Post = new Schema({
    title: String,
    body: String,
    topicId: String,
    userId: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', Post)