const express = require('express');
const router = express.Router()
const userController = require('../controllers/customerController');

// Destructure the imported functions
const {
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
} = userController;
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/').post(registerCustomer).get(protect, getCustomer)
router.post('/login', authCustomer)
router
	.route('/profile')
	.get(protect, getCustomerProfile)
	.put(protect, updateCustomerProfile)
router
	.route('/:id')
	.delete(protect, deleteCustomer)
	.get(protect, getCustomerById)
	.put(  updateCustomer)
	
router
	.route('/:id/address')
	.get( getAddress)
	.post(  addAddressById)
router
	.route('/:id/address/:addressId')
	.delete( deleteAddressById)


	
module.exports = router
