import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import View from "./components/3dView/View";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login/Login";
import { Context } from "./utils/context";
import { useContext, useEffect } from "react";
import ScrollToTop from './ScrollToTop'

function App() {
  const { setUser, setUserId } = useContext(Context);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser){
      let foundUser = JSON.parse(loggedInUser);
      const { username, id } = foundUser;

      setUser(username);
      setUserId(id);
      console.log('found', foundUser);
    }
  }, [setUser, setUserId]);
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
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
            path="/product/:id"
            element={
              <>
                <Header />
                <SingleProduct />
                <Footer />
              </>
            }
          />
          <Route
            path="/view/:id"
            element={
              <>
                <Header />
                <View />
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
