import React from 'react'

import '../assets/css/Reportes.css';

const Reportes = ()=>{
    return(
        <div className="Reportes__container">
            <div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Ganancias hoy</h3>
                <div className="Reportes__tarjeta-cantidad">$ 0.0</div>
            </div>
            <div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Citas hoy</h3>
                <div className="Reportes__tarjeta-cantidad"># citas</div>
            </div>
            <div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Reporte Semanal</h3>
                <div className="Reportes__semana-total"><p>Total: $1000000</p></div>
            </div>
            <div className="Reportes__tarjeta">
                <h3 className="Reportes__tarjeta-titulo">Reporte Mensual</h3>
                <form className="Reportes__form">
                    <div className="Reportes__form-select">
                    <select>
                        <option value="">Mes</option>
                    </select>
                    <select>
                        <option value="">Año</option>
                    </select>
                    </div>
                    <button className="Reportes__form-button"><i class="bi bi-download"></i> Descargar</button>
                </form>
            </div>
        </div>
    )
}

export default Reportes;