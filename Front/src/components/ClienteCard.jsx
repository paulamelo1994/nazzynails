import React from "react";
import { ButtonAction } from "./ButtonAction";

const ClienteCard = ({ nombre, apellido, telefono, id }) => {
    return <section className="cliente__card pb-3 pt-3">
        <div className="d-flex align-items-center justify-content-between">
            <div className="w-75">
            <ul className="p-0 d-flex align-items-center justify-content-between">
                <h4 style={{color: 'var(--main-color)'}}>{nombre || 'Nombre'} {apellido || 'Apellido'}</h4>
                <a href="/" className="cliente__card-telefono">
                    <i className="bi bi-whatsapp"> </i>{telefono || 'Teléfono'}
                </a>
            </ul>
            <ul className="p-0 d-flex justify-content-between">
                <span>Última cita</span>
                <span>{new Date().toLocaleDateString()}</span>
            </ul>
            <ul className="p-0 d-flex justify-content-between">
                <span>Próxima cita</span>
                <span>{new Date().toLocaleDateString()}</span>
            </ul>
            </div>
            <ButtonAction icon="bi bi-pencil" style={{
                background: 'var(--main-color)', 
                color: '#fff', 
                fontSize: '30px'}}
                link={`clientes/nuevo?id=${id}`}
                />
        </div>
        <h5 className="text-center mt-1 mb-1 p-1"><strong>Último(s) servicio(s)</strong></h5>
        <ul className="list-group">
            <span>Servicio 1</span>
            <span>Servicio 2</span>
            <span>Servicio 3</span>
        </ul>
    </section> 
}

export { ClienteCard }