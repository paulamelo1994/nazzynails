const router = require('express').Router()
const path = 'date'

router.get(`/${path}/`, (req, res) => res.send({ message: 'Reservar cita' }))
router.get(`/${path}/cancel`, (req, res) => res.send({ message: 'Cancelar cita' }))

module.exports = router