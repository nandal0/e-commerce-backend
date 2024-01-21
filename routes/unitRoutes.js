const express = require('express');
const router = express.Router()
const userController = require('../controllers/unitController');

// Destructure the imported functions
const {
    registerUnit,
	getUnit,
	deleteUnit,
	getUnitById,
	updateUnit,
} = userController;
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/').post(registerUnit).get( getUnit)

router
	.route('/:id')
	.delete(protect, admin, deleteUnit)
	.get(protect, admin, getUnitById)
	.put(  updateUnit)
	
module.exports = router
