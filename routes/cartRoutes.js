const express = require('express');
const router = express.Router()
const userController = require('../controllers/cartController');

// Destructure the imported functions
const {
    registerCart,
	getCart,
	deleteCart,
	getCartById,
	addQuantityToCartItem,
    subtractQuantityFromCartItem,
} = userController;
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/').post(registerCart).get(getCart)
router.route('/:id/addQuantity').put(addQuantityToCartItem)
router.route('/:id/subtractQuantity').put(subtractQuantityFromCartItem)

router
	.route('/:id')
	.delete(protect,  deleteCart)
	.get(getCartById)
	
module.exports = router
