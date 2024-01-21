const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const altUintSchema = mongoose.Schema(
	{
		pPirce: {
			type: String,
			required: true,
            unique:true,
		},
		sellPrice: {
            type: String,
			required: true,
        },
		mrp: {
            type: String,
			required: true,
        },
        stock:{
            type: String,
			required: true,
        }

	
		
	},
	{
		timestamps: true,
	}
)

// To match enteredPassword with hashed password in the database


const AltUnit = mongoose.model('AltUnit', altUintSchema)

module.exports= AltUnit
