import React from "react";
import { Cookies } from "react-cookie";
import { useLocation } from "react-router-dom";
const AppContext = React.createContext()

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

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

export { AppContext, AppProvider , useQuery}