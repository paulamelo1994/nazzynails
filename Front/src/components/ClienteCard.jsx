import React from "react";
import { Agregar } from "./Agregar";

const ClienteCard = () => {
    return <section className="cliente__card pb-3 pt-3">
        <div className="d-flex align-items-center justify-content-between">
            <div className="w-75">
            <ul className="p-0 d-flex align-items-center justify-content-between">
                <h4 style={{color: 'var(--main-color)'}}>Juan Carlos Ballesteros Romero</h4>
                <a href="#" className="cliente__card-telefono">
                    <i class="bi bi-whatsapp"> </i>3126846268
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
            <Agregar icon="bi bi-pencil" style={{background: 'var(--main-color)', color: '#fff', fontSize: '30px'}}/>
        </div>
        <h5 className="text-center mt-1 mb-1 p-1">Último(s) servicio(s)</h5>
        <ul className="list-group">
            <span>Servicio 1</span>
            <span>Servicio 2</span>
            <span>Servicio 3</span>
        </ul>
    </section> 
}

export { ClienteCard }