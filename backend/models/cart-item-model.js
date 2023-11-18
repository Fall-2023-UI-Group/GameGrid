const mongoose = require('mongoose');

// Schema for cart items
const CartItemSchema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games', // Reference to the Game model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

module.exports = mongoose.model('CartItem', CartItemSchema);
