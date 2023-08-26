import { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import OrderItems from "./OrderItems";
import "./Orders.scss";
import { BsCartX } from "react-icons/bs";

function Orders() {
  const { userId, orders, setOrders } = useContext(Context);
  const [empty, setEmpty] = useState(true);
  const [singleProduct, setSingleProduct] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/${userId}/getorders`);
      const data = await response.json();
      console.log(data);
      setOrders([...data.orders]);
    };
    if (userId) {
      getOrders();
    }
  }, [userId, setOrders, setSingleProduct]);

  orders?.sort((a, b) => {
    const dateA = new Date(a.paymentDate);
    const dateB = new Date(b.paymentDate);
    return dateB - dateA;
  });

  return (
    <div className="main-order-page" style={{display: `${orders.length === 0 ? 'block': 'flex'}`}}>
      <div className="left-container">
        {orders?.length === 0 && (
          <div className="empty-orders">
            <BsCartX />
            <span>NO ORDERS YET</span>
            <buttton
              className="return-cta"
              onClick={() => {
                navigate("/");
              }}
            >
              RETURN TO SHOP
            </buttton>
          </div>
        )}

        {orders?.length > 0 && (
          <OrderItems
            orders={orders}
            setSingleProduct={setSingleProduct}
            setEmpty={setEmpty}
          />
        )}
      </div>
      <div className="line"></div>
      {orders.length > 0 && empty && (
        <div className="right-container">
          <h1>CLICK ON ORDERS TO SEE MORE DETAILS</h1>
        </div>
      )}
      {!empty && (
        <div className="right-container">
          <div className="single-product">
            <div className="img-container">
              <img src={`data:image/png;base64,${singleProduct.img}`} alt="" />
            </div>
            <div className="dash"></div>
            <div className="prod-details">
              <span className="id"><strong>Order Id:</strong> {singleProduct.orderId}</span>
              <span className="name"><strong>Product Name:</strong> {singleProduct.productName}</span>
              <span className="date"><strong>Payment Date:</strong> {singleProduct.date}</span>
              <span className="desc"><strong>Price:</strong> {singleProduct.price}</span>
              <span className="desc"><strong>Quantity:</strong> {singleProduct.quantity}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
