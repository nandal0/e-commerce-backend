const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const uintSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
            unique:true,
		},
		description: {
            type: String,
			required: true,
        }
	
		
	},
	{
		timestamps: true,
	}
)

// To match enteredPassword with hashed password in the database


const Unit = mongoose.model('Unit', uintSchema)

module.exports= Unit
