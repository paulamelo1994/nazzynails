import React from "react";
import '../assets/css/Loader.css'
const Loader = ({ color, scale }) => {
    if(!color){
        color = 'var(--main-color)'
    }
    return <div className="content-loader">
            <div className="lds-roller" style={{transform: `scale(${scale})`}}>
                <div><span style={{ background: color }}></span></div>
                <div><span style={{ background: color }}></span></div>
                <div><span style={{ background: color }}></span></div>
                <div><span style={{ background: color }}></span></div>
                <div><span style={{ background: color }}></span></div>
                <div><span style={{ background: color }}></span></div>
                <div><span style={{ background: color }}></span></div>
            </div>
        </div>
    
}

export { Loader }