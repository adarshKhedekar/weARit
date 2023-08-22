const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error occured!" });
    }
  }
  
exports.createProduct = async (req, res) => {
    try {
      //add image afterwards
      const image = fs.readFileSync("./Products/face4.png");
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
        product: product._id,
      });
  
      await newCategory.save();
      res.status(200).json({
        message: "product added Successfully!",
        newProduct: product._id,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error occured!!" });
    }
}