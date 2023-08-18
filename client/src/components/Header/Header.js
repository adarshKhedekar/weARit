import { useEffect, useState } from "react";
import "./Header.scss";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
// import {BiUserCircle} from 'react-icons/bi'
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { userId, setUserId, setUser, user } = useContext(Context);

  const handleScroll = () => {
    let offset = window.scrollY;
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleToggle = () => {
    setShowDropdown((prevState) => !prevState)
  };

  const handleShowCart = () => {
    if (!userId) {
      navigate("/login");
    } else {
      setShowCart(true);
    }
  };

  const handleLogout = () => {
    setUser({});
    setUserId(null);
    localStorage.clear();
    navigate("/login");
  };

  const handleCart = () => {};

  const handleOrders = () => {};

  const handleSearch = () => {
    setShowSearch(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>About</li>
            <li>Categories</li>
          </ul>
          <div className="center">
            <Link to="/">WeARit</Link>
          </div>
          <div className="right">
            {userId && (
              <div className="user-dropdown">
                <div className="dropdown-toggle" onClick={handleToggle}>
                  Hi! {user}
                </div>
                {showDropdown && (
                  <div className="dropdown">
                    <div className="top"></div>
                    <ul className="dropdown-menu">
                    <li onClick={handleCart}>Cart</li>
                    <li onClick={handleOrders}>Orders</li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                  </div>
                )}
              </div>
            )}
            <AiOutlineSearch onClick={handleSearch} />
            <span className="cart-icon" onClick={handleShowCart}>
              <AiOutlineShoppingCart />
              <span>5</span>
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
}

export default Header;
