import "./Search.scss";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
function Search({ setShowSearch }) {
  return (
    <div className="search-model">
      <div className="form-field">
        <input type="text" autoFocus placeholder="Search for products" />
        <MdClose onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          <div className="search-result-item">
            <div className="img-container">
              <img src={`${process.env.PUBLIC_URL}/Slider/image5.jpg`} alt="" />
            </div>
            <div className="prod-details">
              <span className="name">product name</span>
              <span className="desc">product desc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Search.propTypes = {
  setShowSearch: PropTypes.func.isRequired,
};
export default Search;
