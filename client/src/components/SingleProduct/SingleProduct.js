import "./SingleProduct.scss";
import { BsCartPlus } from "react-icons/bs";
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa'
import RelatedProduct from './RelatedProduct/RelatedProduct';
import { useLocation } from "react-router-dom";
import { Buffer } from 'buffer'
function SingleProduct() {

  const location = useLocation();
  const { productName, productDescription, category, price, image } = location.state;
  const imageBuffer = Buffer.from(image);
  const imageBase64 = imageBuffer.toString('base64');

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={`data:image/png;base64,${imageBase64}`} alt="" />
          </div>
          <div className="right">
            <span className="name">{productName}</span>
            <span className="price">&#8377;{price}</span>
            <span className="desc">{productDescription}</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span>+</span>
                <span>1</span>
                <span>-</span>
              </div>
              <button className="add-to-cart-button">
                <BsCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category: 
                <span>{category}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebook size={16}/>
                  <FaTwitter size={16}/>
                  <FaInstagram size={16}/>
                  <FaLinkedin size={16}/>
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProduct category={category} productName={productName}/>
      </div>
    </div>
  );
}

export default SingleProduct;
