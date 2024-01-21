const mongoose = require('mongoose');

// Create Cart Item Schema
const cartItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product' // Reference to the Product model
    },
    // productName: {
    //     type: String,
    //     required: true
    // },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    // price: {
    //     type: Number,
    //     required: true
    // }
});

// Create Cart Schema
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer' // Reference to the User model
    },
    items: [cartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
