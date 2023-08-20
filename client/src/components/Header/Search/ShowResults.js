import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ShowResults({ results, setShowSearch }) {
  const navigate = useNavigate();

  const handleClick = (productName) => {
    setShowSearch(false);
    navigate(`/product/${productName}`);
  };
  
  return results?.map((item) => {
    const { productName, productDescription, image } = item;
    const imageBuffer = Buffer.from(image.data);
    return (<div className="search-result-item" onClick={() => handleClick(productName)}>
      <div className="img-container">
        <img src={`data:image/png;base64,${imageBuffer.toString("base64")}`} alt=""/>
      </div>
      <div className="prod-details">
        <span className="name">{productName}</span>
        <span className="desc">{productDescription}</span>
      </div>
    </div>);
  });
}

ShowResults.propTypes = {
  results: PropTypes.array.isRequired,
  setShowSearch: PropTypes.func.isRequired,
};

export default ShowResults;
