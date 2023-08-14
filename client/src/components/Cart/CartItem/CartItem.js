import './CartItem.scss';
import { MdClose } from 'react-icons/md';
function CartItem() {
  return (
    <div className='cart-products'>
      <div className="cart-product">
        <div className="img-container">
          <img src={`${process.env.PUBLIC_URL}/Slider/image5.jpg`} alt="" />
        </div>
        <div className="prod-details">
          <span className="name">product name</span>
          <MdClose className='close-btn'/>
          <div className="quantity-buttons">
            <span>-</span>
            <span>5</span>
            <span>+</span>
          </div>
          <div className="text">
            <span>3</span>
            <span>x</span>
            <span className='highlight'>&#8377;3423</span>
          </div>
        </div>
        </div>      
    </div>
  )
}

export default CartItem
