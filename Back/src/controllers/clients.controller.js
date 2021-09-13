const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const clientService = require('../services/client.service');

// routes
router.post('/create', authorize(), newClientSchema, newClient);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function newClientSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function newClient(req, res, next) {
    clientService.create(req.user, req.body)
        .then(() => res.json({message: 'Client created successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    var data = []
    clientService.getAll(req.user)
        .then(clients => {
            clients.forEach(client => {
                data.push({ 
                    "id": client.id,
                    "name": client.name,
                    "address": client.address,
                    "email": client.email,
                    "phoneNumber": client.phoneNumber
                })
            });
            res.json(data);})
        .catch(next);
}

function getById(req, res, next) {
    clientService.getById(req.user, req.params.id)
        .then(client => {
            res.json({
                "id": client.id,
                "name": client.name,
                "address": client.address,
                "email": client.email,
                "phoneNumber": client.phoneNumber
            })
        })
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        address: Joi.string().empty(''),
        email: Joi.string().empty(''),
        phoneNumber: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    clientService.update(req.user, req.params.id, req.body)
        .then(client => res.json({
            "id": client.id,
            "name": client.name,
            "address": client.address,
            "email": client.email,
            "phoneNumber": client.phoneNumber
        }))
        .catch(next);
}

function _delete(req, res, next) {
    clientService.delete(req.user, req.params.id)
        .then(() => res.json({ message: 'Client deleted successfully' }))
        .catch(next);
}