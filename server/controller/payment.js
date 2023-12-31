const PaymentInstance = require("../index");
const crypto = require("crypto");
const User = require("../models/User");



exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await PaymentInstance.instance.orders.create(options);
  res.status(200).json({ success: true, order });
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  if (generated_signature == razorpay_signature) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    const userOrders = user.orders;
    user.cart.map((item) => {
      const { productName, productImage, price, quantity } = item;
      userOrders.push({
        productName,
        productImage,
        price,
        quantity,
        paymentDate: new Date(),
        orderId: razorpay_order_id,
      });
    });
    user.cart = [];
    await user.save();

    return res.redirect(`https://wearit-omega.vercel.app/orders`);
  }
  res.status(404).json({ success: false, message: "Transaction Failed!!" });
};
