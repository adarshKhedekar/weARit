const User = require('../models/User');
exports.addToCart = async (req, res) => {
    const userId = req.params.id;
    const { productName, price, quantity } = req.body;
    const image = req.file.buffer;
    console.log(userId);
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const cartItems = {
        productName,
        price: parseInt(price), // Make sure the field names match
        productImage: image,
        quantity: parseInt(quantity),
      };
  
      const userCart = user.cart;
      const foundCartItem = userCart.find(
        (item) => item.productName === productName
      );
      if (foundCartItem) {
        foundCartItem.quantity = parseInt(quantity);
      } else {
        userCart.push(cartItems);
      }
      await user.save();
  
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
}
  
exports.removeFromCart = async(req,res) => {
    try {
      const userId = req.params.id;
      const {productName} = req.body
      console.log(productName)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
  
      const product = user.cart.findIndex((item) => item.productName === productName);
  
      if(product === -1){
        return res.status(404).json({message: 'Product not Found'})
      }
  
      user.cart.splice(product,1);
  
      await user.save();
  
      res.status(200).json({ message: 'Product removed from cart successfully', cart: user.cart });
  
    } catch (err) {
      res.status(404).json(err);
    }
}
  
exports.getCartItems = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(202).json(user.cart)
    } catch (err) {
      res.status(404).json(err);
    }
}