import "./Cart.scss";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ setShowCart }) {
  const navigate = useNavigate();

  const handleShowCart = () => {
    setShowCart(false);
  };

  const [subtotal, setSubtotal] = useState(0);

  const { userId, setCartItems, cartItems } = useContext(Context);

  useEffect(() => {
    const getCartItems = async () => {
      const response = await fetch(`http://localhost:5000/${userId}/getcart`);
      const data = await response.json();
      setCartItems(data);
      let userData = localStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        userData.cart = data.cart;
        localStorage.setItem("user", JSON.stringify(userData));
      }
      let sum = data.reduce((curr, prod) => {
        return curr + prod.quantity * prod.price;
      }, 0);
      setSubtotal(sum);
    };
    getCartItems();
  }, []);
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
              <div className="button">
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
