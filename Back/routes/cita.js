const router = require('express').Router()

router.use('date')

router.get('/', (req, res) => res.send({ message: 'Reservar cita' }))
router.get('/cancel', (req, res) => res.send({ message: 'Cancelar cita' }))