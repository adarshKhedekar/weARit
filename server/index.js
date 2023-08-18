const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Product = require("./models/Product");
const Category = require("./models/Category");
const User = require("./models/User");
const fs = require("fs");
const port = 5000;
const app = express();


app.use(cors())
app.use(express.json());

//database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/wearit")
  .then(() => {
    console.log("connected to Mongoose");
  })
  .catch((err) => console.log(err));


//Users routes

app.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
      return res.status(400).json({message: 'User not found. Please SignUp to Continue'})
    }else{
      if(password !== user.password){
        return res.status(200).json({message: 'Wrong Password'});
      }
    }
    res.status(200).json({message: 'User Logged in Successfully', userId: user._id, username: user.username});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error occured!" });
  }
});

//creating Users
app.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists. Please give another email" });
    }

    //do hashing...
    const newUser = new User({
      username,
      email,
      password,
      cart: [],
      orders: [],
    });

    newUser.save().then(() => {
      res.status(201).json({
        message: "User registered successfully",
        newUserid: newUser._id,
        newUsername: username
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Product routes

app.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error occured!" });
  }
});

app.post("/product", async (req, res) => {
  try {
    //add image afterwards
    const image = fs.readFileSync('./Products/face4.png');
    const { productName, productDescription, popular, category, price } =
      req.body;

    const existingProduct = await Product.findOne({ productName: productName });

    if (existingProduct) {
      return res.status(200).json({ message: "Product already exist" });
    }

    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      productName,
      productDescription,
      popular,
      category,
      price,
      image,
    });

    await product.save();

    const newCategory = new Category({
      category: category,
      product: product._id
    })

    await newCategory.save();
    res.status(200).json({
      message: "product added Successfully!",
      newProduct: product._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error occured!!" });
  }
});

app.get("/category", async (req, res) => {
  try {
    const { category } = req.body;
    console.log(category);
    const categoriesWithProducts = await Category.find({category: category}).populate("product").exec();
    res.json(categoriesWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

