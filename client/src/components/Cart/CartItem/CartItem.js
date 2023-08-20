import './CartItem.scss';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types'
import { Buffer } from 'buffer'
import { useContext } from 'react';
import { Context } from '../../../utils/context';
import { ToastContainer, toast } from 'react-toastify';
function CartItem({product}) {

  const {productName, quantity, price, productImage} = product;
  const imageBuffer = Buffer.from(productImage.data);
  const imageBase64 = imageBuffer.toString('base64');
  const {userId, setCartItems} = useContext(Context)

  const handleRemoveItem = async() => {
    const response = await fetch(`http://localhost:5000/${userId}/removeFromCart`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({productName})
    })
    const data = await response.json();
    setCartItems(data.cart)
    let userData = localStorage.getItem('user');
    if(userData){
      userData = JSON.parse(userData)
      userData.cart = data.cart;
      localStorage.setItem('user', JSON.stringify(userData))
    }
    toast.success(data.message)
  }
  
  return (
    <div className='cart-products'>
      <ToastContainer/>
      <div className="cart-product">
        <div className="img-container">
          <img src={`data:image/png;base64,${imageBase64}`} alt="" />
        </div>
        <div className="prod-details">
          <span className="name">{productName}</span>
          <MdClose className='close-btn' onClick={handleRemoveItem}/>
          <div className="text">
            <span>{quantity}</span>
            <span>x</span>
            <span className='highlight'>&#8377;{price}</span>
          </div>
          <span>Quantity:</span>
        </div>
        </div>      
    </div>
  )
}
CartItem.prototype = {
  product: PropTypes.array.isRequired
}

export default CartItem
