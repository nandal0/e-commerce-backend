const express = require('express');
const router = express.Router()
const productController = require('../controllers/productController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = productController;

const { protect, admin } = authMiddleware;


router.route('/').get(getProducts).post( createProduct)
router.route('/:id/reviews').post( createProductReview)
router.get('/top', getTopProducts)

router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

module.exports = router;

