import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import View from "./components/3dView/View";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";
import About from "./components/About/About";
import { Context } from "./utils/context";
import { useContext, useEffect } from "react";
import ScrollToTop from "./ScrollToTop";

function App() {
  const { setUser, setUserId, setCartItems, setPopularProducts, setOrders } =
    useContext(Context);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      let foundUser = JSON.parse(loggedInUser);
      const { username, id, cart } = foundUser;
      setUser(username);
      setUserId(id);
      setCartItems(cart);
      console.log("found", foundUser);
    }
    const getProducts = async () => {
      console.log(process.env.REACT_APP_BACKEND_URI)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/product`);
      const data = await response.json();
      console.log("popularporduct", data);
      setPopularProducts(data);
    };
    getProducts();
  }, [setUser, setUserId, setCartItems, setPopularProducts, setOrders]);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/category/:id"
            element={
              <>
                <Header />
                <Category />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:productName"
            element={
              <>
                <Header />
                <SingleProduct />
                <Footer />
              </>
            }
          />
          <Route
            path="/view/:productName"
            element={
              <>
                <Header />
                <View />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Header />
                <NoMatch />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
