const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const Offers = require('../models/offerModel');


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerOffer = asyncHandler(async (req, res) => {
	const { name,
		code ,
        value,
		expiryDate, } = req.body
	// console.log('name: ', name);

	const userExists = await Offers.findOne({ code })

	if (userExists) {
		res.status(400)
		throw new Error('Offers already exists')
	}

	const user = await Offers.create({
		name,
		code ,
        value,
		expiryDate,
	})

	if (user) {
		console.log('user: ', user);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			code: user.code,
			value: user.value,
			expiryDate: user.expiryDate,
			
            createdAt:user.createdAt,

			token: generateToken(user._id),
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
const getOffer = asyncHandler(async (req, res) => {
	const users = await Offers.find()
	res.json(users)
})
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteOffer = asyncHandler(async (req, res) => {
	const user = await Offers.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'Offers removed' })
	} else {
		res.status(404)
		throw new Error('Offers not found')
	}
})
// @desc    Get user bu ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getOfferById = asyncHandler(async (req, res) => {
	const user = await Offers.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('Offers not found')
	}
})
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateOffer = asyncHandler(async (req, res) => {
	const user = await Offers.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.value = req.body.value || user.value
		user.code = req.body.code || user.code
		user.expiryDate = req.body.expiryDate || user.expiryDate

		// user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()
        res.status(201).json({
			_id: user._id,
			name: user.name,
			code: user.code,
			value: user.value,
			expiryDate: user.expiryDate,
			
            createdAt:user.createdAt,

			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('Offers Not Found')
	}
})

module.exports ={
	registerOffer,
	getOffer,
	deleteOffer,
	getOfferById,
	updateOffer,
}
