const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {config} = require('dotenv');
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const Razorpay = require('razorpay');

const Product = require("./models/Product");
const Category = require("./models/Category");
const User = require("./models/User");

const userController = require('./controller/user');
const productController = require('./controller/product')
const categoryController = require('./controller/category')
const cartController = require('./controller/cart')
const paymentRouter = require('./routes/payment')

config({path: './config/config.env'})

const app = express();
const upload = multer();



app.use(cors(
  {
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use('/', paymentRouter)

//database connection
mongoose
  .connect(`mongodb+srv://Adarsh152:${process.env.DB_PASSWORD}@cluster0.srun7ni.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("connected to Mongoose");
  })
  .catch((err) => console.log(err));


exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
})



//Users routes
app.post("/login", userController.userLogin);
app.post("/register", userController.userRegister);

//Product routes
//1.get all products
app.get("/product", productController.getAllProducts);
//2.create product
app.post("/product", productController.createProduct);

//Category routes
//1.get category
app.get("/category", categoryController.getCategory);

//Cart routes
//1.add to cart
app.post("/:id/addToCart", upload.single("image"), cartController.addToCart);
//2.remove from cart
app.post('/:id/removeFromCart', cartController.removeFromCart)
//3.get cartitems
app.get("/:id/getcart", cartController.getCartItems);

app.get('/getKey', (req,res) => {
  res.status(200).json({key: process.env.RAZORPAY_API_KEY})
})

app.get('/:id/getorders', async(req,res) => {
  const userId = req.params.id;
  const user = await User.findById(userId)
  if(!user){
    return res.status(404).json({message: 'User not Found'});
  }
  res.status(200).json({orders: user.orders});
})








app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});


//mongo password and username is same : Adarsh152
