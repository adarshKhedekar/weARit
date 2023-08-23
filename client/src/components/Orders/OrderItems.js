import PropTypes from "prop-types";
import { Buffer } from "buffer";
function OrderItems({ orders, setSingleProduct, setEmpty }) {
  const handleClick = (item, img, date) => {
    setEmpty(false);
    setSingleProduct({ ...item, img: img, date: date });
  };
  return orders?.map((item) => {
    const { productName, productImage, paymentDate } = item;
    const imageBuffer = Buffer.from(productImage.data);
    const imageBase64 = imageBuffer.toString("base64");

    const currdate = new Date(paymentDate);
    const day = currdate.getDate();
    const month = currdate.getMonth() + 1;
    const year = currdate.getFullYear();
    const date = `${day}/${month}/${year}`
    return (
      <div
        className="order-items"
        onClick={() => handleClick(item, imageBase64, date)}
      >
        <div className="img-container">
          <img src={`data:image/png;base64,${imageBase64}`} alt="" />
        </div>
        <div className="prod-details">
          <span className="name">{productName}</span>
          <span className="desc">Payment on: {date}</span>
        </div>
        <span className="arrow">&gt;</span>
      </div>
    );
  });
}
OrderItems.prototype = {
  orders: PropTypes.array.isRequired,
  setSingleProduct: PropTypes.func.isRequired,
  setEmpty: PropTypes.func.isRequired,
};
export default OrderItems;
