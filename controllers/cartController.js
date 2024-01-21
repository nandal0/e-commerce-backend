const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const Cart = require('../models/cartModel');
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/productModel.js');


// @desc    Register a new cart
// @route   POST /api/users
// @access  Public
const registerCart = asyncHandler(async (req, res) => {
	
    try {
        const { productId,  quantity, userId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const newCart = new Cart({
                user: userId,
                items: [{ productId,  quantity,  }]
            });

            await newCart.save();
            return res.status(201).json(newCart);
        }
        // const existingProductId = new ObjectId(productId);

        // Check if the product already exists in the cart
        const existingProduct = cart.items.find(item => item.productId.toString() === productId);
        // const extractedId = cart.items[0].productId.toString()// Extracted ID as a string
        // console.log('extractedId: ', extractedId);

        // console.log('item: ', extractedId===productId);
        // console.log('existingProduct: ', existingProductId);
        // console.log('existingProduct: ', existingProduct);

        if (existingProduct) {
            existingProduct.quantity += quantity;
            await cart.save();
            return res.status(200).json(cart);
        }

        cart.items.push({ productId,  quantity, });
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

})
// @desc    Get cart profile
// @route   GET /api/users/profile
// @access  Private


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin


const addQuantityToCartItem = asyncHandler(async (req, res) => {
    try {
        const { cartId, productId } = req.body;

        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cartItem.quantity += 1; // Increment quantity by 1
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Subtract quantity from cart item
// @route   PUT /api/carts/:cartId/items/:productId/subtract-quantity
// @access  Private
const subtractQuantityFromCartItem = asyncHandler(async (req, res) => {
    try {
        const { cartId, productId } = req.body;

        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        if (cartItem.quantity <= 1) {
            return res.status(400).json({ message: 'Quantity cannot be less than 1' });
        }

        cartItem.quantity -= 1; // Decrement quantity by 1
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


const getCart= asyncHandler(async (req, res) => {
	const users = await Cart.find()
	res.json(users)
})
// @desc    Delete cart
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteCart = asyncHandler(async (req, res) => {
	const cart = await Cart.findById(req.params.id)
	if (cart) {
		await cart.remove()
		res.json({ message: 'Cart removed' })
	} else {
		res.status(404)
		throw new Error('Cart not found')
	}
})
// @desc    Get cart bu ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getCartById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('userId: ', userId);
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.productId',
            select: 'item unit category subCategory description gst price mrp stock countInStock image',
            model: Product
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }


})
// @desc    Update cart
// @route   PUT /api/users/:id
// @access  Private/Admin

module.exports ={
	registerCart,
	getCart,
	deleteCart,
	getCartById,
    addQuantityToCartItem,
    subtractQuantityFromCartItem,
}
