const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  popular: Boolean,
  category: {
    type: String, 
    required: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
