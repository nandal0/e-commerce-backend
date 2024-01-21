const express = require('express');
const router = express.Router()
const userController = require('../controllers/couponController');

// Destructure the imported functions
const {
    registerCoupon,
	getCoupon,
	deleteCoupon,
	getCouponById,
	updateCoupon,
} = userController;
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/').post(registerCoupon).get( getCoupon)

router
	.route('/:id')
	.delete(protect, admin, deleteCoupon)
	.get(protect, admin, getCouponById)
	.put(  updateCoupon)
	
module.exports = router
