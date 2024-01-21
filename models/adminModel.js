const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create User Schema
const adminSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
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
		
		// isAdmin: {
		// 	type: Boolean,
		// 	required: true,
		// 	default: false,
		// },
	},
	{
		timestamps: true,
	}
)

// To match enteredPassword with hashed password in the database
adminSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// To encrypt password upon registration
adminSchema.pre('save', async function (next) {
	// First check if password is modified
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports= Admin
