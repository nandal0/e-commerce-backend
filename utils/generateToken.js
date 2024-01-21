const jwt = require('jsonwebtoken');

const generateToken = (id) => {
	return jwt.sign({ id }, "jrarraurt", { expiresIn: '30d' })
}

module.exports= generateToken
