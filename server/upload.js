
const Product = require("./models/Product");
const Category = require('./models/Category');
const mongoose = require('mongoose')

const uploadImage = async (req, res) => {
  
  const newProduct = new Product({
    
  });
  await newProduct.save();

  const newCategory = new Category({
    category: 'eye wear',
    product: newProduct._id
  })

  await newCategory.save();
  console.log('saved!!')
};

uploadImage();