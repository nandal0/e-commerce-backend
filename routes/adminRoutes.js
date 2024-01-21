const express = require('express');
const router = express.Router()
const userController = require('../controllers/adminController');

// Destructure the imported functions
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = userController;
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(  updateUser)
	
module.exports = router
