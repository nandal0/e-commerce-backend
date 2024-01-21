const mongoose = require('mongoose');

// Create Order Schema
const categorySchema = mongoose.Schema(
	{
		
	
		categoryName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true, 
		},
		image: {
            type: String,
			required: true,
		},
		
		
	},
	// {
	// 	timestamps: true,
	// }
)

const Category = mongoose.model('Category', categorySchema)

module.exports= Category
