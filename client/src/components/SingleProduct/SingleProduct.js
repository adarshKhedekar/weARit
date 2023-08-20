import "./SingleProduct.scss";
import { BsCartPlus } from "react-icons/bs";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import RelatedProduct from "./RelatedProduct/RelatedProduct";
import { useParams, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../utils/context";
import { useContext } from "react";
function SingleProduct() {
  const { productName } = useParams();
  console.log('product is', productName)
  const navigate = useNavigate();
  const { userId, setCartItems, popularProducts, cartItems } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const [isPresent, setIsPresent] = useState(false);
  const [currProduct, setCurrProduct] = useState(null);
  const [img, setImg] = useState(null);


    
    useEffect(() => {
      setQuantity(1);
      console.log('pop', popularProducts)
      const singleProduct = popularProducts?.find(
        (item) => {
          return item.productName === productName
        }
      );

      cartItems?.map((item) => {
        if (item.productName === productName) {
          setIsPresent(true);
        }
        return -1;
      });


      if(singleProduct){
        const { productDescription, category, price, image } = singleProduct;
        const imageBuffer = Buffer.from(image);
        setImg(imageBuffer);
        setCurrProduct({productDescription: productDescription, category: category, price: price})
      }

    }, [productName, cartItems, isPresent, popularProducts]);
    console.log('in comp')
    

  const handleAddToCart = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("productName", productName);
      formData.append("quantity", quantity);
      formData.append("price", currProduct.price);

      // Create a Blob from the image buffer
      const imageBlob = new Blob([img], { type: "image/png" });
      // console.log((imageBlob.size)/1024)
      // console.log(image)

      formData.append("image", imageBlob); // Append the image file

      const response = await fetch(
        `http://localhost:5000/${userId}/addToCart`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setCartItems(data.cart);
      console.log(data.cart);
      let userData = localStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        userData.cart = data.cart;
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setQuantity(1);
      toast.success("Item added to Cart successfully");
    } catch (err) {
      console.log("err", err);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const decrementQuantity = () => {
    quantity > 1
      ? setQuantity((prevState) => prevState - 1)
      : toast.error("Quantity should be greater than 1");
  };

  return (
    currProduct ? (<div className="single-product-main-content">
      <ToastContainer />
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={`data:image/png;base64,${img.toString("base64")}`} alt="" />
          </div>
          <div className="right">
            <span className="name">{productName}</span>
            <span className="price">&#8377;{currProduct.price}</span>
            <span className="desc">{currProduct.productDescription}</span>

            <div className="cart-buttons">
              {!isPresent && (
                <div className="quantity-buttons">
                  <span onClick={decrementQuantity}>-</span>
                  <span>{quantity}</span>
                  <span onClick={incrementQuantity}>+</span>
                </div>
              )}
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                <BsCartPlus size={20} />
                {isPresent ? "GO TO CART" : "ADD TO CART"}
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category:
                <span>{currProduct.category}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebook size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedin size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProduct category={currProduct.category} productName={productName} />
      </div>
    </div>) : <div>Loading....</div>
  );
}

export default SingleProduct;
