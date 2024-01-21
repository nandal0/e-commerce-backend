const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const SubCategory=require('../models/subCategoryModel')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addSubCategory = asyncHandler(async (req, res) => {
	const {
        categoryName,
		subCategoryName,
        description,
        image
	} = req.body
	const categoryExists = await SubCategory.findOne({ subCategoryName })

	if (categoryExists!==null) {
		res.status(400)
		throw new Error('No Sub Category ')
		return
	} else {
		const subCategory = new SubCategory({
			categoryName,
			subCategoryName,

        description,
        image
		})

		// Save new order to the database
		const createdSubCategory = await subCategory.save()
		res.status(201).json(createdSubCategory)
	}
})
const addCategory = asyncHandler(async (req, res) => {
	const {
        categoryName,
        description,
        image
	} = req.body

	// Check if there are order items
	const categoryExists = await Category.findOne({ categoryName })

	if (categoryExists!==null) {
		res.status(400)
		throw new Error('No Category ')
		return
	} else {

		const category = new Category({
			categoryName,
        description,
        image
		})

		// Save new order to the database
		const createdCategory = await category.save()
		console.log('createdCategory: ', createdCategory);
		res.status(201).json(createdCategory)
	}
})
// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Category.findById(req.params.id).populate(
		'user',
		'name email'
	)

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Category.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Category.find({ user: req.user._id })
	res.json(orders)
})
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

const getCategory = asyncHandler(async (req, res) => {
	const orders = await Category.find({}).populate('')
	res.json(orders)
})

const getSubCategory = asyncHandler(async (req, res) => {
	const orders = await SubCategory.find({}).populate('')
	res.json(orders)
})
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Category.findById(req.params.id)

	if (order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})

module.exports= {
	addCategory,
	addSubCategory,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getCategory,
	getSubCategory,


	updateOrderToDelivered,
}
