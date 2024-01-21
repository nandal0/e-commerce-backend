// addressModel.js

const mongoose = require('mongoose');

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

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
