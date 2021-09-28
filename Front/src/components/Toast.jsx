import React from "react";
import '../assets/css/Toast.css'
import { AppContext } from "../AppContext";
const Toast = () => {
    const { toast } = React.useContext(AppContext)
    return <div className='w-75 p-4 main__toast' style={{background: toast.tipo}}>
        {toast.message}
  </div>
}

export { Toast }