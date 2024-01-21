const express = require('express');
const router = express.Router()
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = orderController;



const { protect, admin } = authMiddleware;


router.route('/').post(addOrderItems).get( getOrders)
router.route('/myorders').get( getMyOrders)
router.route('/:id').get( getOrderById)
router.route('/:id/pay').put( updateOrderToPaid)
router.route('/:id/deliver').put( updateOrderToDelivered)

module.exports = router;
