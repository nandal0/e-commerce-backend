const path = require('path');
const express = require('express');
const morgan = require('morgan');
const multer=require('multer')
const router = express.Router()

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
		`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})

function checkFileType(file, cb) {
	// console.log('file: ', file);
	// Accepted file types
	const filetypes = /jpg|jpeg|png/

	// Check if upload file type matches with accepted file types
	const extName = filetypes.test(
		path.extname(file.originalname).toLocaleLowerCase()
	)

	const mimetype = filetypes.test(file.mimetype)
	if (extName && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only!')
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

// export default router
module.exports = router;

