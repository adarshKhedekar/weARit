import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({});
    return <Context.Provider value={{
        userId,
        setUserId,
        user,
        setUser
    }}>{children}</Context.Provider>
}

export default AppContext;