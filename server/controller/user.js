const User = require("../models/User");
exports.userLogin = async (req, res) => {

    console.log(req.body);
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "User not found. Please SignUp to Continue" });
      } else {
        if (password !== user.password) {
          return res.status(200).json({ message: "Wrong Password" });
        }
      }
      res.status(200).json({
        message: "User Logged in Successfully",
        userId: user._id,
        username: user.username,
        cart: user.cart
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error occured!" });
    }
}
  
exports.userRegister = async (req, res) => {
try {
    console.log(req.body);
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
    return res.status(400).json({
        message:
        "User with this email already exists. Please give another email",
    });
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
        newUsername: username,
    });
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
}