import React from 'react'
import { ClienteCard } from './ClienteCard'
import '../assets/css/Cliente.css'

const ClienteList = () => {
    return <ul className="list-group">
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
        <ClienteCard/>
    </ul>
}

export { ClienteList }