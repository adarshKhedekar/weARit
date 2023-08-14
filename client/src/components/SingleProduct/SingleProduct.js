import "./SingleProduct.scss";
import { BsCartPlus } from "react-icons/bs";
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa'
import RelatedProduct from './RelatedProduct/RelatedProduct';
function SingleProduct() {
  console.log()
  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={`${process.env.PUBLIC_URL}/Slider/image5.jpg`} alt="" />
          </div>
          <div className="right">
            <span className="name">Product name</span>
            <span className="price">Price</span>
            <span className="desc">Product desc</span>

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
                <span>Eye Wear</span>
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
        <RelatedProduct/>
      </div>
    </div>
  );
}

export default SingleProduct;
