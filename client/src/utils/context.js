import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});
  const [popularProducts, setPopularProducts] = useState();
  const [cartItems, setCartItems] = useState();
  const [showCart, setShowCart] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [orders, setOrders] = useState([]);

  const addToCart = async (product, quantity) => {
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("quantity", quantity);
    formData.append("price", product.price);

    // Create a Blob from the image buffer
    const imageBlob = new Blob([product.img], { type: "image/png" });

    formData.append("image", imageBlob); // Append the image file

    const response = await fetch(`http://localhost:5000/${userId}/addToCart`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setCartItems(data.cart);
    console.log(data.cart);
    let userData = localStorage.getItem("user");
    if (userData) {
      userData = JSON.parse(userData);
      console.log(data.cart, userData.cart)
      userData.cart = data.cart;
      localStorage.setItem("user", JSON.stringify(userData));
    }
    let sum = data.cart.reduce((curr, prod) => {
        return curr + prod.quantity * prod.price;
    }, 0);
    setSubtotal(sum);
  };

  const getCartItems = async () => {
    const response = await fetch(`http://localhost:5000/${userId}/getcart`);
    const data = await response.json();
    console.log('user-cart', data);
    setCartItems(data);
    let sum = data.reduce((curr, prod) => {
      return curr + prod.quantity * prod.price;
    }, 0);
    setSubtotal(sum);
  };

  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        user,
        setUser,
        popularProducts,
        setPopularProducts,
        cartItems,
        setCartItems,
        showCart,
        setShowCart,
        addToCart,
        getCartItems,
        subtotal,
        setSubtotal,
        orders, 
        setOrders
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
