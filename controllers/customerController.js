const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken.js');
const Customer = require('../models/customerModel');
const Address = require('../models/addressModel');


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authCustomer = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await Customer.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			user:{
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			},
			
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerCustomer = asyncHandler(async (req, res) => {
	const { name, email, password ,mobile} = req.body
	console.log(' name, email, password ,mobile: ',  name, email, password ,mobile);
	// console.log('mobile: ', mobile);
	// console.log('name: ', name);

	const userExists = await Customer.findOne({ email })
	// console.log('userExists: ', userExists);

	if (userExists) {
		res.status(400)
		throw new Error('Customer already exists')
	}

	const user = await Customer.create({
		name,
		mobile,
        email,
		password,
	})

	console.log('user: ', user);
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
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
const getCustomerProfile = asyncHandler(async (req, res) => {
	const user = await Customer.findById(req.user._id)
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('Customer Not Found')
	}
})
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateCustomerProfile = asyncHandler(async (req, res) => {
	const user = await Customer.findById(req.user._id)
	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(404)
		throw new Error('Customer Not Found')
	}
})
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getCustomer = asyncHandler(async (req, res) => {
	const users = await Customer.find()
	res.json(users)
})
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteCustomer = asyncHandler(async (req, res) => {
	const user = await Customer.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({ message: 'Customer removed' })
	} else {
		res.status(404)
		throw new Error('Customer not found')
	}
})
// @desc    Get user bu ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getCustomerById = asyncHandler(async (req, res) => {
	const user = await Customer.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('Customer not found')
	}
})


const addAddressById = asyncHandler(async (req, res) => {
	const customerId = req.params.id;
  const { isDefault, addressType, fullName, number, city, country, postalCode, address,state } = req.body;
  console.log('state: ', state);

  // Find the customer
  const customer = await Customer.findById(customerId);

  if (!customer) {
    res.status(404).json({ message: 'Customer not found' });
    return;
  }

  // Create a new address
  const newAddress = new Address({ isDefault, addressType, fullName, number, city, country, postalCode, address,state });
  
  // Add the address to the customer's address array
  console.log('newAddress: ', newAddress);
  customer.address.push(newAddress);

  // Save the customer with the new address
  await customer.save();

  res.status(201).json(newAddress);
})


const deleteAddressById = asyncHandler(async (req, res) => {
	const customerId = req.params.customerId;
	const addressId = req.params.addressId;
  
	// Find the customer
	const customer = await Customer.findById(customerId);
  
	if (!customer) {
	  res.status(404).json({ message: 'Customer not found' });
	  return;
	}
  
	// Find the address within the customer's addresses
	const addressIndex = customer.address.findIndex(address => address._id.toString() === addressId);
  
	if (addressIndex === -1) {
	  res.status(404).json({ message: 'Address not found' });
	  return;
	}
  
	// Remove the address from the array
	customer.address.splice(addressIndex, 1);
  
	// Save the customer without the deleted address
	await customer.save();
  
	res.json({ message: 'Address removed' });
})


// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const getAddress = asyncHandler(async (req, res) => {
	const customerId = req.params.id;

  // Find the customer
  const customer = await Customer.findById(customerId);

  if (!customer) {
    res.status(404).json({ message: 'Customer not found' });
    return;
  }

  res.json(customer.address);
	
})
const updateCustomer = asyncHandler(async (req, res) => {
	const user = await Customer.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.mobile = req.body.mobile || user.mobile
		user.password=req.body.password || user.password
		// user.permissions = req.body.permissions || user.permissions

		// user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			// permissions: updatedUser.permissions,
			// isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('Customer Not Found')
	}
})

module.exports ={
	authCustomer,
	registerCustomer,
	getCustomerProfile,
	updateCustomerProfile,
	getCustomer,
	deleteCustomer,
	getCustomerById,
	updateCustomer,
	getAddress,
	addAddressById,
	deleteAddressById
}
