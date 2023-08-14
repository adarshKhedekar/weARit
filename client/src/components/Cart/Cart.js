import './Cart.scss'
import PropTypes from 'prop-types'
import {MdClose} from 'react-icons/md';
import {BsCartX} from 'react-icons/bs';
import CartItem from './CartItem/CartItem';

function Cart({setShowCart}) {
    const handleShowCart = () => {
        setShowCart(false);
    }
  return (
    <div className='cart-panel'>
        <div className="opac-layer"></div>      
        <div className="cart-content">
            <div className="cart-header">
                <span className="heading">Shopping Cart</span>
                <span className="close-btn" onClick={handleShowCart}>
                    <MdClose/>
                    <span className="text">close</span>
                </span>
            </div>
            {/* <div className="empty-cart">
                <BsCartX/>
                <span>No Products in the cart</span>
                <buttton className="return-cta">RETURN TO SHOP</buttton>
            </div> */}

            <>
                <CartItem/>
                <div className="cart-footer">
                    <div className="subtotal">
                        <span className="text">Subtotal:</span>
                        <span className="text">&#8377;344</span>
                    </div>
                    <div className="button">
                        <div className="checkout-cta">Checkout</div>
                    </div>
                </div>
            </>
        </div>
    </div>
  )
}

Cart.propTypes = {
    setShowCart: PropTypes.func.isRequired,
};
export default Cart
