import React from "react";
import { ButtonAction } from "./ButtonAction";

const ClienteCard = ({ nombre, telefono, id }) => {
    const nombreNormalize = nombre.split(" ").map(s => s.length >= 10 ? s.slice(0, 10) + ".." : s)
    return <section className="cliente__card pb-3 pt-3">
        <div className="d-flex align-items-center justify-content-between">
            <div className="w-75">
            <ul className="p-0 d-flex align-items-center justify-content-between">
                <h4 style={{color: 'var(--main-color)'}}>{nombreNormalize[0] || ''} {nombreNormalize[1] || ''}</h4>
                <a href={`https://api.whatsapp.com/send?phone=+57${telefono}`} className="cliente__card-telefono">
                    <i className="bi bi-whatsapp" style={{marginRight: '5px'}}></i>{telefono || ''}
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
                background: 'lightseagreen', 
                color: '#fff', 
                fontSize: '30px'}}
                link={`clientes/form?id=${id}`}
                />
        </div>
        {/* <h5 className="text-center mt-1 mb-1 p-1"><strong>Último(s) servicio(s)</strong></h5>
        <ul className="list-group">
            <span>Servicio 1</span>
            <span>Servicio 2</span>
            <span>Servicio 3</span>
        </ul> */}
    </section> 
}

export { ClienteCard }