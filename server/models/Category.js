const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
