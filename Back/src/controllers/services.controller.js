const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const serviceService = require('../services/service.service');

// routes
router.post('/create', authorize(), newServiceSchema, newService);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function newServiceSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        length: Joi.number().integer().required(),
        enable: Joi.bool().required(),
        price: Joi.number().integer().required()
    });
    validateRequest(req, next, schema);
}

function newService(req, res, next) {
    serviceService.create(req.user, req.body)
        .then(() => res.json({message: 'Service created successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    var data = []
    serviceService.getAll(req.user)
        .then(services => {
            services.forEach(service => {
                data.push({ 
                    "id": service.id,
                    "name": service.name,
                    "length": service.length,
                    "enable": service.enable,
                    "price": service.price
                })
            });
            res.json(data);})
        .catch(next);
}

function getById(req, res, next) {
    serviceService.getById(req.user, req.params.id)
        .then(service => {
            res.json({
                "id": service.id,
                "name": service.name,
                "length": service.length,
                "enable": service.enable,
                "price": service.price
            })
        })
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(),
        length: Joi.number().integer().empty(),
        enable: Joi.bool().empty(),
        price: Joi.number().integer().empty()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    serviceService.update(req.user, req.params.id, req.body)
        .then(service => res.json({
            "id": service.id,
            "name": service.name,
            "length": service.length,
            "enable": service.enable,
            "price": service.price
        }))
        .catch(next);
}

function _delete(req, res, next) {
    serviceService.delete(req.user, req.params.id)
        .then(() => res.json({ message: 'Service deleted successfully' }))
        .catch(next);
}