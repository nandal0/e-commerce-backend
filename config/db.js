const mongoose = require('mongoose');
require('dotenv').config();
const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='jarruat'
const client= new MongoClient(url);

const connectDB = async () => {
	try {
		// Connect to Mongo
		// const conn = await mongoose.connect(process.env.MONGO_URI, {
		// 	useUnifiedTopology: true,
		// 	useNewUrlParser: true,
		// 	useCreateIndex: true,
		// }) // New mongo url parser
		// console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)


		mongoose.connect('mongodb://0.0.0.0:27017/jarruat').then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log('e: ', e);
  console.log(`Not Connected`);
}); 

	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold)
		// exit with failure
		process.exit(1)
	}
}

module.exports = connectDB;
