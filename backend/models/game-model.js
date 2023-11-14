const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('games', GameSchema);
