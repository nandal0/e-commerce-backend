const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const addressSchema = mongoose.Schema({
		isDefault: {
		  type: Boolean,
		  default: false,
		},
		addressType: {
		  type: String, // 'home' or 'office'
		  required: true,
		},
		fullName: {
		  type: String,
		  required: true,
		},
		number: {
		  type: String,
		  required: true,
		},
		city: {
		  type: String,
		  required: true,
		},
		state: {
		  type: String,
		  required: true,
		},
		country: {
		  type: String,
		  required: true,
		},
		postalCode: {
		  type: String,
		  required: true,
		},
		address: {
		  type: String,
		  required: true,
		},
});


const customerSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			// required: true,
		},
		
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	address:[addressSchema],
		
	},
	{
		timestamps: true,
	}
)

// To match enteredPassword with hashed password in the database
customerSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// To encrypt password upon registration
customerSchema.pre('save', async function (next) {
	// First check if password is modified
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports= Customer
