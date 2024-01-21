const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const offerSchema = mongoose.Schema(
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
        expiryDate: {
            type: Date, 
          },
	
		
	},
	{
		timestamps: true,
	}
)

// To match enteredPassword with hashed password in the database


const Offers = mongoose.model('Offers', offerSchema)

module.exports= Offers
