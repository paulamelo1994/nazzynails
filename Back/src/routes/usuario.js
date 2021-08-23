const router = require('express').Router()
const path = 'user'

router.get(`/${path}/`, (req, res) => res.send({ message: 'Reservar usuario' }))
router.get(`/${path}/cancel`, (req, res) => res.send({ message: 'Cancelar usuario' }))

module.exports = router