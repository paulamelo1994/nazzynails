const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const { param } = require('../controllers/appointments.controller');
const { Op } = require('sequelize');

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
    for(const appointment of await listAppointments){
      loadClient = await db.Client.findOne({where:{id: appointment.clientId}});
      appointment.clientId = await loadClient;
  
      var serviceList = []
      for (const service of await appointment.serviceList) {
        buscarServicio = await db.Service.findOne({
          where:{
            id: service
          }
        })
        if(buscarServicio){serviceList.push(buscarServicio)}
      }
      appointment.serviceList = await serviceList;
      arrayResult.push(await appointment);
    }
    return await arrayResult;
}

async function getAllbyDate(user) {
  var arrayResult = [];
    listAppointments = await db.Appointment.findAll({
        where: {
          userId: user.id,
          time: {[Op.between]: ["2021-01-01 00:00:00", "2021-01-01 23:59:59"]}
        }
      });
    for(const appointment of await listAppointments){
      loadClient = await db.Client.findOne({where:{id: appointment.clientId}});
      appointment.clientId = await loadClient;
  
      var serviceList = []
      for (const service of await appointment.serviceList) {
        buscarServicio = await db.Service.findOne({
          where:{
            id: service
          }
        })
        if(buscarServicio){serviceList.push(buscarServicio)}
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
          userId: user.id
        },
      });
    if (!appointment) {throw 'Appointment not found';}
    loadClient = await db.Client.findOne({where:{id: appointment.clientId}});
    appointment.clientId = await loadClient;

    var serviceList = []
    for (const service of await appointment.serviceList) {
      buscarServicio = await db.Service.findOne({
        where:{
          id: service
        }
      })
      if(buscarServicio){serviceList.push(buscarServicio)}
    }
    appointment.serviceList = await serviceList;
    return await appointment;
}

async function create(user, params) {
    params.userId = user.id;
    params.appointmentIsDone = false;

    searchClient = await db.Client.findOne({
      where: {
        id: params.clientId
      }
    });

    for (const service of params.serviceList) {
      buscarServicio = await db.Client.findOne({
        where:{
          id: service
        }
      })
      if(!buscarServicio){throw 'Service ' + service + ' not found';}
    }
    if (!searchClient) {throw 'Client not found';}
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
    Object.assign(appointment, params);
    await appointment.save();
    return appointment.get();
}

async function _delete(user, id) {
    appointment = await db.Appointment.findOne({
        where: {
          id: id,
          userId: user.id
        },
      });
    if (!appointment) throw 'Appointment not found';
    await appointment.destroy();
}

async function getAppointment(id) {
    const appointment = await db.Appointment.findByPk({
      where: {
        id: id,
        userId: user.id
      },
    });
    if (!appointment) throw 'Appointment not found';
    return appointment;
}