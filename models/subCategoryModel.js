const mongoose = require('mongoose');

// Create Order Schema
const subCategoryName = mongoose.Schema(
	{
		
	
		categoryName: {
			type: String,
			required: true,
		},
		subCategoryName: {
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

const SubCategory = mongoose.model('SubCategory', subCategoryName)

module.exports= SubCategory
