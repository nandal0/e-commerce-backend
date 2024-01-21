const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const Unit = require('../models/unitModel');


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUnit = asyncHandler(async (req, res) => {
	const { name,
		description, } = req.body
	// console.log('name: ', name);

	const userExists = await Unit.findOne({ name })

	if (userExists) {
		res.status(400)
		throw new Error('Unit already exists')
	}

	const user = await Unit.create({
		name,
		description,
	})

	if (user) {
		console.log('user: ', user);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			description: user.description,
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
const getUnit = asyncHandler(async (req, res) => {
	const users = await Unit.find()
	res.json(users)
})
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUnit = asyncHandler(async (req, res) => {
	const user = await Unit.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'Unit removed' })
	} else {
		res.status(404)
		throw new Error('Unit not found')
	}
})
// @desc    Get user bu ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUnitById = asyncHandler(async (req, res) => {
	const user = await Unit.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('Unit not found')
	}
})
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUnit = asyncHandler(async (req, res) => {
	const user = await Unit.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.description = req.body.description || user.description

		// user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()
        res.status(201).json({
			_id: user._id,
			name: user.name,
			description: user.description,
            createdAt:user.createdAt,

			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('Unit Not Found')
	}
})

module.exports ={
	registerUnit,
	getUnit,
	deleteUnit,
	getUnitById,
	updateUnit,
}
