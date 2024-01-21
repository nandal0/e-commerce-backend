const express = require('express');
// const { getCategory } = require('../controllers/categoryController.js');
const router = express.Router()
const categoryController = require('../controllers/categoryController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const {
    addSubCategory,

  getSubCategory,

} = categoryController;

const { protect, admin } = authMiddleware;


router.route('/').get(getSubCategory).post(  addSubCategory)

// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)

// router
// 	.route('/:id')
// 	.get(getProductById)
// 	.delete(protect, admin, deleteProduct)
// 	.put(protect, admin, updateProduct)

module.exports = router;

