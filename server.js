const path = require('path');
const express = require('express');
const { json } = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');

const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const customerRoutes = require('./routes/customerRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const unitRoutes = require('./routes/unitRoutes');
const altUnitRoutes = require('./routes/altUnitRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const offerRoutes = require('./routes/offerRoutes');
const couponRoutes = require('./routes/couponRoutes');
const cartRoutes = require('./routes/cartRoutes');


dotenv.config()

// Invoke connectDB
connectDB() 

const app = express()
const corsOptions = {
	origin: 'http://localhost:3000', // Replace with your site's link
	methods: 'GET, POST, PUT, DELETE',
	allowedHeaders: '*'
	// allowedHeaders: 'Content-Type, Authorization',
  };
  
  // Enable CORS with options
  app.use(cors(corsOptions));
  
  

// Run morgan ONLY if in development mode
// morgan logs all activities
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}
app.use(express.json())

// Mount routes to respective imports
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/subCategory', subCategoryRoutes)
app.use('/api/offer', offerRoutes)
app.use('/api/coupon', couponRoutes)
app.use('/api/unit', unitRoutes)
app.use('/api/altUnit', altUnitRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/upload', uploadRoutes)

// app.get('/api/config/paypal', (req, res) =>
// 	res.send(process.env.PAYPAL_CLIENT_ID)
// )

// Make uploads folder static
// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Load build folder as static ONLY in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	// test get route
	app.get('/', (req, res) => {
		res.send('API is running...')
	})
}

// Error middleware for 404
app.use(notFound)

// Error handler middleware
app.use(errorHandler)

// Set port number
const PORT = process.env.PORT || 8000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
