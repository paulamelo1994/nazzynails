const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const { param } = require('../controllers/appointments.controller');
const { Op } = require('sequelize');
const e = require('express');

module.exports = {
  getAll,
  getAllbyDate,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(user) {
    var arrayResult = [];
    listAppointments = await db.Appointment.findAll({
        where: {
            userId: user.id
        }
    });
    for (const appointment of await listAppointments) {
        loadClient = await db.Client.findOne({ where: { id: appointment.clientId } });
        appointment.clientId = await loadClient;

        var serviceList = []
        for (const service of await appointment.serviceList) {
            buscarServicio = await db.Service.findOne({
                where: {
                    id: service
                }
            })
            if (buscarServicio) { serviceList.push(buscarServicio) }
        }
        appointment.serviceList = await serviceList;
        arrayResult.push(await appointment);
    }
    return await arrayResult;
}

async function getAllbyDate(user, date) {
    var arrayResult = [];
    listAppointments = await db.Appointment.findAll({
        where: {
            userId: user.id,
            time: {
                [Op.between]: [date + " 00:00:00", date + " 23:59:59"] }
        }
    });
    for (const appointment of await listAppointments) {
        loadClient = await db.Client.findOne({ where: { id: appointment.clientId } });
        appointment.clientId = await loadClient;
        let serviceList = []
        for (const service of await appointment.serviceList) {
            buscarServicio = await db.Service.findOne({
                where: {
                    id: service
                }
            })
            if (buscarServicio) { serviceList.push(buscarServicio) }
        }
        appointment.serviceList = await serviceList;
        arrayResult.push(await appointment);
    }
    return await arrayResult;
}

async function getById(user, id) {
    appointment = await db.Appointment.findOne({
        where: {
            id: id,
            userId: user.id,
            enabled: true
        },
    });
    if (!appointment) { throw 'Appointment not found'; }
    loadClient = await db.Client.findOne({ where: { id: appointment.clientId } });
    appointment.clientId = await loadClient;

    let serviceList = []
    for (const service of await appointment.serviceList) {
        buscarServicio = await db.Service.findOne({
            where: {
                id: service
            }
        })
        if (buscarServicio) { serviceList.push(buscarServicio) }
    }
    appointment.serviceList = await serviceList;
    return await appointment;
}

async function create(user, params) {
    params.userId = user.id;
    params.appointmentIsDone = false;

    searchClient = await db.Client.findOne({
        where: {
            id: params.clientId,
            enabled: true
        }
    });
    if (!searchClient) { throw 'Client not found'; }

    for (const service of params.serviceList) {
        buscarServicio = await db.Service.findOne({
            where: {
                id: service,
                enabled: true
            }
        })
        if (!buscarServicio) { throw 'Service ' + service + ' not found'; }
    }

    await db.Appointment.create(params);
}

async function update(user, id, params) {
    appointment = await db.Appointment.findOne({
        where: {
            id: id,
            userId: user.id
        },
    });
    if (!appointment) throw 'Appointment not found';

    searchClient = await db.Client.findOne({
        where: {
            id: params.clientId,
            enabled: true
        }
    });
    if (!searchClient) { throw 'Client not found'; }

    for (const service of params.serviceList) {
        buscarServicio = await db.Client.findOne({
            where: {
                id: service,
                enabled: true
            }
        })
        if (!buscarServicio) { throw 'Service ' + service + ' not found'; }
    }
    Object.assign(appointment, params);
    await appointment.save();
    return appointment.get();
}

async function _delete(user, id) {
    appointment = await db.Appointment.findOne({
        where: {
            id: id,
            userId: user.id,
            enabled: true
        },
    });
    console.log(appointment)
    if (!appointment) throw 'Appointment not found';
    else appointment.enabled = false;
    await appointment.save();
}

async function getAppointment(id) {
    const appointment = await db.Appointment.findByPk({
        where: {
            id: id,
            userId: user.id,
            enabled: true
        },
    });
    if (!appointment) throw 'Appointment not found';
    return appointment;
}