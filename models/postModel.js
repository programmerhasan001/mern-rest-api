const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        default: "admin"
    },
    category: {
        type: Array,
        required: false
    },
    photo: {
        type: String,
        require: true
    },

}, { timestamps: true })

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;