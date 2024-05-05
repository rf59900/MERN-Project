const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
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
        required: true
    },
    board: String,
    img: String
});

module.exports = mongoose.model('Post', postSchema);