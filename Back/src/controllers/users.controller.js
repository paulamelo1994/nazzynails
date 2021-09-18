const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const userService = require('../services/user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(
            { 
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "id": user.id,
                "token": user.token
            }
            ))
        .catch(() => {res.json({message: req.error})});
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch((error) => {
            if(!req.error){
                res.json({message: error})
            } else {
                res.json({message: req.error})
            }
        });
}

function getAll(req, res, next) {
    var data = []
    userService.getAll()
        .then(users => {
            users.forEach(user => {
                data.push({ 
                    "id": user.id,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "username": user.username
                })
            });
            res.json(data);})
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => {
            res.json({
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username
            })
        })
        .catch((error) => {res.json({message: error})});
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch((error) => {
            if(!req.error){
                res.json({message: error})
            } else {
                res.json({message: req.error})
            }
        });
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch((error) => {
                res.json({message: error})
        });
}