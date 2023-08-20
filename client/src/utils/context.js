import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({});
    const [popularProducts, setPopularProducts] = useState();
    const [cartItems, setCartItems] = useState([]);
    
    return <Context.Provider value={{
        userId,
        setUserId,
        user,
        setUser, 
        popularProducts,
        setPopularProducts, 
        cartItems,
        setCartItems
    }}>{children}</Context.Provider>
}

export default AppContext;