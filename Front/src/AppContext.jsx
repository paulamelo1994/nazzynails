import React from "react";
const AppContext = React.createContext()

function AppProvider({ children }){
    const [token, setToken] = React.useState('HOLA_TOKEN')

    return <AppContext.Provider value={{
        token,
        setToken
    }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider }