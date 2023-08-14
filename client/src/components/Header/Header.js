import { useEffect, useState } from "react";
import "./Header.scss";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import Search from "./Search/Search";
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleScroll = () => {
    let offset = window.scrollY;
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleShowCart = () => {
    setShowCart(true);
  }

  const handleSearch = () => {
    setShowSearch(true);
  }
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
            <AiOutlineSearch onClick={handleSearch} />
            <AiOutlineHeart />
            <span className="cart-icon" onClick={handleShowCart}>
              <AiOutlineShoppingCart />
              <span>5</span>
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart}/>}
      {showSearch && <Search setShowSearch={setShowSearch}/>}
    </>
  );
}

export default Header;
