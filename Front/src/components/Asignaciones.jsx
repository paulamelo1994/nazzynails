import React from "react";


import esmalte from '../assets/icons/botella-esmalte.svg'

const Asignaciones = (props)=>{

   
    
    return (
        <div className="Asignaciones__card">
            <div className="Asignaciones__datos">
                <h1>{props.nombre}</h1>
                <p id="hora"><i class="bi bi-clock"></i> {props.hora}</p>
                <p id="telefono"><i class="bi bi-whatsapp"></i> {props.telefono}</p>
            </div>
            <div className="Asignaciones__servicios">
                <h1>Servicios</h1>
                {
                    
                    props.servicios.map((item, index) => {
                    return(<p><span className="Asignaciones__servicios-icon"><img alt="asd" src={esmalte}/></span> {item.name}</p>)
                       
                    }) 
                    

                }
                
                
            </div>
        </div>
    );


}
export default Asignaciones;