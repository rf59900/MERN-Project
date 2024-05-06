const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    body: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
        required: true
    },
    replyTo: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',

    },
    img: String
});

module.exports = mongoose.model('Comment', commentSchema);