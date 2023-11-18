const mongoose = require('mongoose');

// Schema for shopping cart
const ShoppingCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: false,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem', // Reference to the CartItem model
    }],
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);
