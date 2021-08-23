const express = require('express')
const cors = require('cors')
const app = express()

const PORT = proccess.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Coloca el nombre del archivo que contiene sus respectivas rutas
const routes = [

]

// Se importan cada una de las rutas
app.use('/api', routes.map(r => require(`./routes/${r}`)))

const server = app.listen(PORT, () => console.log('Servidor iniciado en el puerto', PORT))