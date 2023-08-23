import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../utils/context";
import { Buffer } from "buffer";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EyeView from './EyeView';
import FaceView from "./FaceView";

function View() {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [isPresent, setIsPresent] = useState(false);
  const { popularProducts, addToCart, userId, cartItems, setShowCart } =
    useContext(Context);
  const [currProduct, setCurrProduct] = useState(null);

  useEffect(() => {
    const foundProduct = cartItems?.findIndex(
      (item) => item.productName === productName
    );

    if (foundProduct === -1) {
      console.log("not");
      setIsPresent(false);
    } else {
      console.log("yes");
      setIsPresent(true);
    }
    const singleProduct = popularProducts?.find((item) => {
      return item.productName === productName;
    });

    if (singleProduct) {
      const { productDescription, category, price, image } = singleProduct;
      const imageBuffer = Buffer.from(image);
      setCurrProduct({
        productName: productName,
        productDescription: productDescription,
        category: category,
        price: price,
        img: imageBuffer,
      });
    }
  }, [productName, cartItems, isPresent, popularProducts]);

  const handleAddToCart = async (e) => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if(e.target.innerText === 'GO TO CART'){
      setShowCart(true);
      return;
    }
    try {
      addToCart(currProduct, 1);
      toast.success("Item added to Cart successfully");
    } catch (err) {
      console.log("err", err);
    }
  };

  return <div>   
    <ToastContainer/>
    {currProduct?.category === 'eye wear' ? <EyeView handleAddToCart={handleAddToCart} currProduct={currProduct} isPresent={isPresent}/> : <FaceView handleAddToCart={handleAddToCart} currProduct={currProduct} isPresent={isPresent}/>}
  </div>;
}

export default View;
