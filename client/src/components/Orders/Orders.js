import { useContext, useEffect, useState } from "react"
import { Context } from "../../utils/context";

function Orders() {
    const [orders, setOrders] = useState([]);
    const {userId} = useContext(Context);
    useEffect(() => {
        const getOrders = async() => {
            const response = await fetch(`http://localhost:5000/${userId}/getorders`);
            const data = await response.json();
            console.log(data)
            setOrders([...(data.orders)]);
        }
        if(userId){
            getOrders();
        }
    },[userId])
  return (
    <>
      {orders?.map((items) => {
        return (<><h1>{items.productName}</h1><h1>{items.quantity}</h1></>)
      })}
      {orders?.length === 0 && <h1>Empty</h1>}
    </>
  )
}

export default Orders
