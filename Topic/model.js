const mongoose = require('mongoose')
const Schema = mongoose.Schema



const Topic = new Schema({
    title: String,
    parentId: String,
    userId: String,
    createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Topic', Topic)