const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const { param } = require('../controllers/reports.controller');
const { Op } = require('sequelize');
var pcn = require("pdf-creator-node");
var fs = require("fs");
const { func } = require('joi');
var html = fs.readFileSync("src/content/reportTemplate.html", "utf8");


module.exports = {
  createReport
};

async function getDatabyDate(user, date) {
  var date2 = new Date(date);
  date2 = date2.setMonth(date2.getMonth()+1);

    listAppointments = await db.Appointment.findAll({
        where: {
          userId: user.id,
          time: {[Op.between]: [date, date2]}
        },
        order: [['time',  'ASC']]
        
      });
    return await getListAppointments(await listAppointments);
}

async function getListAppointments(arrayAppointments){
  var arrayResult = [];
  for(const appointment of await arrayAppointments){
    loadClient = await db.Client.findOne({where:{id: appointment.clientId}});
    appointment.clientId = await loadClient;
    
    appointment.serviceList = await getListService(await appointment.serviceList);

    value = await calculateValue(await appointment.serviceList);

    arrayResult.push(appointmentModified(await appointment, value));
  }
  return await arrayResult;
}

function appointmentModified(appointment, value){
  var time = appointment.time;
  time = time.toLocaleString("default");
  return {
    "id": appointment.id,
    "client": appointment.clientId.id + ": " + appointment.clientId.name + " - " + appointment.clientId.phoneNumber,
    "time" : time,
    "price" : value,
    "appointmentIsDone" : appointment.appointmentIsDone
  }
}

async function getListService(arrayServices){
  var serviceList = []
    for (const service of await arrayServices) {
      buscarServicio = await db.Service.findOne({
        where:{
          id: service
        }
      })
      if(buscarServicio){serviceList.push(buscarServicio)}
    }
  return await serviceList;
}

async function calculateValue(arrayServices){
  var value = 0;
    for (const service of await arrayServices) {
      value += service.price;
    }
  return await value;
}

async function calculateTotal(arrayPrices){
  var total = 0;
    for (const price of await arrayPrices) {
      total += price.price;
    }
  return await total;
}

async function createReport(user, body) {
  datos = await getDatabyDate(user, body.date);
  total = await calculateTotal(await datos);
    return await generatePDF(await datos, await total, body.date);
}

async function generatePDF(data, total, date){
console.log(total);
  var document = {
    html: html,
    data: {
      appointments: data,
      valorTotal: total,
      date: date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear()
    },
    path: "src/content/pdfGenerated/Reporte_NazzyNails.pdf",
    type: "",
  };

  var options = {
    format: "Letter",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: ''
    },
    footer: {
        height: "28mm",
        contents: {
            first: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            2: 'Second page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            last: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
        }
    }
  };

  pdf = await pcn.create(document, options)
  .then()
  .catch();
  return await pdf 
}