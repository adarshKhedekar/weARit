import "./Cart.scss";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Razorpay from 'razorpay'

function Cart({ setShowCart }) {
  const navigate = useNavigate();
  const { getCartItems, cartItems, subtotal, user, userId, setCartItems } = useContext(Context);

  const handleShowCart = () => {
    setShowCart(false);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleCheckout = async () => {
    try{
    setShowCart(false)
    const resp = await fetch(`${process.env.REACT_APP_BACKEND_URI}/getKey`);
    const key = await resp.json();

    const productsData = {
      amount: subtotal,
      userId: userId,
      cart: cartItems
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsData),
    });
    const data = await response.json();
    setCartItems([]);
    let userData = localStorage.getItem('user');
    console.log(userData);
    if(userData){
      userData = JSON.parse(userData);
      userData.cart = [];
      localStorage.setItem('user', JSON.stringify(userData))
    }

    console.log(data);
    var options = {
      key,
      amount: data.order.amount,
      currency: "INR",
      name: "WeARit",
      description: "This product is best",
      image: "../../assets/Category/eyeglass.jpg",
      order_id: data.order.id,
      callback_url: `${process.env.REACT_APP_BACKEND_URI}/${userId}/paymentverification`,
      prefill: {
        name: user,
        email: "test@test.com",
        contact: "9000090000",
      },
      notes: {
        address: "Dahisar ghartan pada",
      },
      theme: {
        color: "#212121",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }catch(err){
    console.log('err', err);
  }
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={handleShowCart}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {cartItems?.length === 0 && (
          <div className="empty-cart">
            <BsCartX />
            <span>No Products in the cart</span>
            <buttton
              className="return-cta"
              onClick={() => {
                handleShowCart();
                navigate("/");
              }}
            >
              RETURN TO SHOP
            </buttton>
          </div>
        )}

        {cartItems?.length > 0 && (
          <>
            {cartItems?.map((product) => {
              return <CartItem key={product.id} product={product} />;
            })}
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text">&#8377;{subtotal}</span>
              </div>
              <div className="button" onClick={handleCheckout}>
                <div className="checkout-cta">Checkout</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  setShowCart: PropTypes.func.isRequired,
};
export default Cart;
