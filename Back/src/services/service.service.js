const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const { param } = require('../controllers/services.controller');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(user) {
    return await db.Service.findAll({
        where: {
          userId: user.id
        }
      });
}

async function getById(user, id) {
    service = await db.Service.findOne({
        where: {
          id: id,
          userId: user.id
        },
      });
    if (!service) throw 'Service not found';
    return await service;
}

async function create(user, params) {
    params.userId = user.id;
    await db.Service.create(params);
}

async function update(user, id, params) {
    service = await db.Service.findOne({
        where: {
          id: id,
          userId: user.id
        },
      });
    if (!service) throw 'Service not found';
    Object.assign(service, params);
    await service.save();
    return service.get();
}

async function _delete(user, id) {
    service = await db.Service.findOne({
        where: {
          id: id,
          userId: user.id
        },
      });
    if (!service) throw 'Service not found';
    await service.destroy();
}

async function getService(id) {
    const service = await db.Service.findByPk(id);
    if (!service) throw 'Service not found';
    return service;
}