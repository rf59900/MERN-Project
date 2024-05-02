const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: True
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
        required: True
    },
    replyTo: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',

    }
});

module.exports = mongoose.model('Post', postSchema);