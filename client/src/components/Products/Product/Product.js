import './Product.scss'
import PropTypes from 'prop-types';
import { Buffer } from 'buffer';
import {useNavigate} from 'react-router-dom'

function Product({productName, productDescription, category, price, image}) {

  const imageBuffer = Buffer.from(image);
  const imageBase64 = imageBuffer.toString('base64');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${productName}`)
  }

  return (
    <div className='product-card' onClick={handleClick}>
      <div className="thumbnail">
        <img src={`data:image/png;base64,${imageBase64}`} alt=""/>
      </div>
      <div className="prod-details">
        <span className="name">{productName}</span>
        <span className="price">&#8377;{price}</span>
      </div>
    </div>
  )
}

Product.propTypes = {
  productName: PropTypes.string.isRequired,
  productDescription: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.array.isRequired,
};

export default Product
