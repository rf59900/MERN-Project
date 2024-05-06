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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    avatar: String,
    refreshToken: String,
    roles: {
        type: [String],
        default: ["User"]
    }
});

module.exports = mongoose.model('User', userSchema);