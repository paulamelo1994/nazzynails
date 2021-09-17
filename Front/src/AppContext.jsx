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
    const [toast, setToast] = React.useState({
        message: '',
        tipo: ''
    })
    
    const createCookie = (token) => {
        cookies.set("token", token, { path: "/" , sameSite: true, secure: true})
    }
    React.useEffect(() => {
        if(toast.message){
            setTimeout(() => setToast({...toast, message:'' }), 3000)
        }
    })
    return <AppContext.Provider value={{
        token,
        setToken,
        createCookie,
        toast,
        setToast
    }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider , useQuery}