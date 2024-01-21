const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const couponSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
			unique: true,
		},
		value: {
			type: String,
			required: true,
		},
		count : {
			type: String,
			required: true,
		},
        expiryDate: {
            type: Date, 
          },
	
		
	},
	{
		timestamps: true,
	}
)

// To match enteredPassword with hashed password in the database


const Coupon = mongoose.model('Coupon', couponSchema)

module.exports= Coupon
