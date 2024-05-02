const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
});

module.exports = mongoose.model('User', userSchema);