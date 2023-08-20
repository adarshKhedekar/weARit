import "./Search.scss";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import ShowResults from "./ShowResults";

function Search({ setShowSearch }) {

  const {popularProducts} = useContext(Context);
  const [toDisplay, setToDisplay] = useState([]);
  

  const handleUpdate = (e) => {
    const input = e.target.value;
    const len = e.target.value.length;
    if (len === 0) {
      setToDisplay([])
      return;
    }
    const regex = new RegExp(input, 'gi');
  
    const matches = popularProducts?.filter((x) => {
      return x.productName.match(regex) || x.productDescription.match(regex);
    });
  
    setToDisplay([...matches])
  };

  return (
    <div className="search-model">
      <div className="form-field">
        <input type="text" autoFocus placeholder="Search for products" onChange={handleUpdate} />
        <MdClose onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {/* Serach Content */}
          <ShowResults results={toDisplay} setShowSearch={setShowSearch}/>
        </div>
      </div>
    </div>
  );
}

Search.propTypes = {
  setShowSearch: PropTypes.func.isRequired,
};

export default Search;