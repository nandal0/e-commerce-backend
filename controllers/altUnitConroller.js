const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const AltUnit = require('../models/altUnitModel');


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUnit = asyncHandler(async (req, res) => {
	const { pPirce,
		sellPrice,
        mrp,
        stock
    } = req.body
	// console.log('name: ', name);

	// const userExists = await AltUnit.findOne({  })

	// if (userExists) {
	// 	res.status(400)
	// 	throw new Error('AltUnit already exists')
	// }

	const user = await AltUnit.create({
        pPirce,
		sellPrice,
        mrp,
        stock
	})

	if (user) {
		console.log('user: ', user);
		res.status(201).json({
			_id: user._id,
            pPirce:user.pPirce,
            sellPrice:user.sellPrice,
            mrp:user.mrp,
            stock:user.stock

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
	const users = await AltUnit.find()
	res.json(users)
})
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUnit = asyncHandler(async (req, res) => {
	const user = await AltUnit.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'AltUnit removed' })
	} else {
		res.status(404)
		throw new Error('AltUnit not found')
	}
})
// @desc    Get user bu ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUnitById = asyncHandler(async (req, res) => {
	const user = await AltUnit.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('AltUnit not found')
	}
})
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUnit = asyncHandler(async (req, res) => {
	const user = await AltUnit.findById(req.params.id)

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
		throw new Error('AltUnit Not Found')
	}
})

module.exports ={
	registerUnit,
	getUnit,
	deleteUnit,
	getUnitById,
	updateUnit,
}
