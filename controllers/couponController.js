const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const Coupon = require('../models/couponModel');


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerCoupon = asyncHandler(async (req, res) => {
	const { name,
		code ,
        value,
        count,
		expiryDate, } = req.body
	// console.log('name: ', name);

	const userExists = await Coupon.findOne({ code })

	if (userExists) {
		res.status(400)
		throw new Error('Coupon already exists')
	}

	const user = await Coupon.create({
        name,
		code ,
        value,
        count,
		expiryDate
	})

	if (user) {
		console.log('user: ', user);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			code: user.code,
			value: user.value,
			count: user.count,

			expiryDate: user.expiryDate,
			
            createdAt:user.createdAt,

			// token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getCoupon = asyncHandler(async (req, res) => {
	const users = await Coupon.find()
	res.json(users)
})
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
	const user = await Coupon.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'Coupon removed' })
	} else {
		res.status(404)
		throw new Error('Coupon not found')
	}
})
// @desc    Get user bu ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getCouponById = asyncHandler(async (req, res) => {
	const user = await Coupon.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('Coupon not found')
	}
})
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
	const user = await Coupon.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.value = req.body.value || user.value
		user.code = req.body.code || user.code
		user.count = req.body.code || user.count
		 user.expiryDate = req.body.expiryDate || user.expiryDate

		// user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()
        res.status(201).json({
			_id: user._id,
			name: user.name,
			code: user.code,
			value: user.value,
			count: user.count,
			expiryDate: user.expiryDate,
			
            createdAt:user.createdAt,

			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('Coupon Not Found')
	}
})

module.exports ={
	registerCoupon,
	getCoupon,
	deleteCoupon,
	getCouponById,
	updateCoupon,
}
