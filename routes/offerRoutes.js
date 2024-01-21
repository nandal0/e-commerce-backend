const express = require('express');
const router = express.Router()
const userController = require('../controllers/offerController');

// Destructure the imported functions
const {
    registerOffer,
	getOffer,
	deleteOffer,
	getOfferById,
	updateOffer,
} = userController;
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/').post(registerOffer).get( getOffer)

router
	.route('/:id')
	.delete(protect, admin, deleteOffer)
	.get( getOfferById)
	.put(  updateOffer)
	
module.exports = router
