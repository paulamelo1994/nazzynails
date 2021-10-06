import React from "react";
import { ButtonAction } from "./ButtonAction";
import { toTime, toFormat } from "../InputServicio";

const ServiceCard = ({ nombre, precio, tiempo, isActive, id }) => {
    // const nameNormalize = nombre.split(" ").map(s => s.length >= 15 ? s.slice(0, 15) + ".." : s)
    // anterior salida de h4 linea "REMOVIDO DE AQUI"
    // <!--<h4 style={{color: 'var(--main-color)'}}>{nameNormalize[0] || ''} {nameNormalize[1] || ''}</h4>-->
    return <section className="servicio__card pb-3 pt-3">
        <div className="d-flex align-items-center justify-content-between">
            <div className="w-75">
            <ul className="p-0 d-flex align-items-center justify-content-between">
                {/* "REMOVIDO DE AQUI" */}
                <h4 style={{color: 'var(--main-color)'}}>{nombre}</h4>
                <span className="service__card-precio">{toFormat(precio)}</span>
            </ul>
            <ul className="p-0 d-flex justify-content-between">
                <span className="service__card-tiempo"><i className="bi bi-clock"></i> {toTime(tiempo)}</span>
                <span className="service__card-active">{isActive ? 'Activo' : 'Inactivo'}</span>
            </ul>
            </div>
            <ButtonAction icon="bi bi-pencil" style={{
                background: 'lightseagreen', 
                color: '#fff', 
                fontSize: '30px'}}
                link={`servicios/form?id=${id}`}
                />
        </div>
    </section> 
}

export { ServiceCard }