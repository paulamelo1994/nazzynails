import React from "react";
import { Cookies } from "react-cookie";
const AppContext = React.createContext()

function AppProvider({ children }){
    const cookies = new Cookies()
    const [token, setToken] = React.useState(cookies.get('token'))
    
    const createCookie = (token) => {
        cookies.set("token", token, { path: "/" , sameSite: true, secure: true})
    }
    return <AppContext.Provider value={{
        token,
        setToken,
        createCookie
    }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider }