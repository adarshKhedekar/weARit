import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({});
    const [popularProducts, setPopularProducts] = useState();
    return <Context.Provider value={{
        userId,
        setUserId,
        user,
        setUser, 
        popularProducts,
        setPopularProducts
    }}>{children}</Context.Provider>
}

export default AppContext;