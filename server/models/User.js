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
  cart: [
    {
      productName: String,
      productImage: Buffer,
      price: Number,
      quantity: Number,
    }
  ],
  orders: [{
      productName: String,
      productImage: Buffer,
      price: Number,
      quantity: Number,
      paymentDate: Date,
      orderId: String,
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
