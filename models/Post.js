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
        required: True
    }
});

module.exports = mongoose.model('Post', postSchema);