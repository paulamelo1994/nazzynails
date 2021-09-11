const router = require('express').Router()
const path = 'cliente'
const { Cliente } = models

router.post(`/${path}/`, async(req, res) => {
    const usuarioId = req.body.telefono
    if (usuarioId) {
        const query = await Cliente.findAll({
            where: { usuarioId: usuarioId }
        })
        res.send(query)
    }
    res.sendStatus(305)
})

module.exports = router