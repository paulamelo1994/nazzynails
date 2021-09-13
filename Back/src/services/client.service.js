const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const { param } = require('../controllers/clients.controller');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(user) {
    return await db.Client.findAll({
        where: {
          userId: user.id
        }
      });
}

async function getById(user, id) {
    client = await db.Client.findOne({
        where: {
          id: id,
          userId: user.id
        },
      });
    if (!client) throw 'Client not found';
    return await client;
}

async function create(user, params) {
    params.userId = user.id;
    await db.Client.create(params);
}

async function update(user, id, params) {
    client = await db.Client.findOne({
        where: {
          id: id,
          userId: user.id
        },
      });
    if (!client) throw 'Client not found';
    Object.assign(client, params);
    await client.save();
    return client.get();
}

async function _delete(user, id) {
    client = await db.Client.findOne({
        where: {
          id: id,
          userId: user.id
        },
      });
    if (!client) throw 'Client not found';
    await client.destroy();
}

async function getClient(id) {
    const client = await db.Client.findByPk(id);
    if (!client) throw 'Client not found';
    return client;
}