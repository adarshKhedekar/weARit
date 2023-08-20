const fs = require('fs')
const Product = require("./models/Product");
const Category = require('./models/Category');
const mongoose = require('mongoose')

const uploadImage = async (req, res) => {
  
  const image = fs.readFileSync("./Products/face4.png");
  console.log(image)
};

uploadImage();