const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  orders: [{
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }],
    orderDate: {
      type: Date,
      default: Date.now,
    },
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
