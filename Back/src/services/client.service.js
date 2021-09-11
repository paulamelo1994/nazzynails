const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Client.findAll();
}

async function getById(id) {
    return await getClient(id);
}

async function create(params) {
    await db.Client.create(params);
}

async function update(id, params) {
    const client = await getClient(id);
    Object.assign(client, params);
    await client.save();
    return client.get();
}

async function _delete(id) {
    const client = await getClient(id);
    await client.destroy();
}

async function getClient(id) {
    const client = await db.Client.findByPk(id);
    if (!client) throw 'Client not found';
    return client;
}