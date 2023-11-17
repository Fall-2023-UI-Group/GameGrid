const mongoose = require('mongoose')

// Schema for users
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cart: {
        type: [Number], // Defines 'cart' as an array of numbers
        default: [],    // Optional: Sets the default value as an empty array
    },
});

module.exports = mongoose.model('users', UserSchema);