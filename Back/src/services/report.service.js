const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const { param } = require('../controllers/reports.controller');
const { Op } = require('sequelize');
let pcn = require("pdf-creator-node");
let fs = require("fs");
const { func } = require('joi');
let html = fs.readFileSync("src/content/reportTemplate.html", "utf8");


module.exports = {
    createReport,
    getDataWeek,
    deleteReport
};

async function getDatabyDate(user, date) {
    let date2 = new Date(date);
    date2 = date2.setMonth(date2.getMonth() + 1);

    listAppointments = await db.Appointment.findAll({
        where: {
            userId: user.id,
            time: {
                [Op.between]: [date, date2]
            }
        },
        order: [
            ['time', 'ASC']
        ]

    });
    return await getListAppointments(await listAppointments);
}

async function getDataWeek(user, date) {
    let date2 = new Date(date.date);
    date2.setHours(0, 0, 0);
    let date3 = new Date(date.date);
    date3.setHours(23, 59, 59);
    switch (date2.getDay()) {
        case 0:
            date2.setDate(date2.getDate() - 6)
            break;
        default:
            date2.setDate(date2.getDate() - (date2.getDay() - 1))
    }

    listAppointments = await db.Appointment.findAll({
        where: {
            userId: user.id,
            time: {
                [Op.between]: [date2, date3]
            }
        },
        order: [
            ['time', 'ASC']
        ]

    });

    return await getListAppointments(await listAppointments);
}

async function getListAppointments(arrayAppointments) {
    let arrayResult = [];
    for (const appointment of await arrayAppointments) {
        loadClient = await db.Client.findOne({ where: { id: appointment.clientId } });
        appointment.clientId = await loadClient;

        appointment.serviceList = await getListService(await appointment.serviceList);

        value = await calculateValue(await appointment.serviceList);

        arrayResult.push(appointmentModified(await appointment, value));
    }
    return await arrayResult;
}

function appointmentModified(appointment, value) {
    let time = appointment.time;
    time = time.toLocaleString("default");
    return {
        "id": appointment.id,
        "client": appointment.clientId.name + " - " + appointment.clientId.phoneNumber,
        "time": time,
        "price": value,
        "appointmentIsDone": appointment.appointmentIsDone
    }
}

async function getListService(arrayServices) {
    let serviceList = []
    for (const service of await arrayServices) {
        buscarServicio = await db.Service.findOne({
            where: {
                id: service
            }
        })
        if (buscarServicio) { serviceList.push(buscarServicio) }
    }
    return await serviceList;
}

async function calculateValue(arrayServices) {
    let value = 0;
    for (const service of await arrayServices) {
        value += service.price;
    }
    return await value;
}

async function calculateTotal(arrayPrices) {
    let total = 0;
    for (const price of await arrayPrices) {
        total += price.price;
    }
    return await total;
}

async function createReport(user, body) {
    datos = await getDatabyDate(user, body.date);
    total = await calculateTotal(await datos);
    return await generatePDF(await datos, await total, body.date, user.id);
}

async function generatePDF(data, total, date, id) {
    let dateFormat = date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear()
    let document = {
        html: html,
        data: {
            appointments: data,
            valorTotal: total,
            date: dateFormat
        },
        path: "src/content/pdfGenerated/" + id + "_" + dateFormat + "_" + "Reporte_NazzyNails.pdf",
        type: "",
    };

    let options = {
        format: "Letter",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "0mm",
            contents: ''
        },
        footer: {
            height: "0mm",
            contents: {
                first: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                2: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                last: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
            }
        }
    };

    const pdf = await pcn.create(document, options)
    return await pdf.filename
}

async function deleteReport(body) {
    return await fs.unlink(body.filename, function(err) {
        if (err) {
            throw err
        }
    })
}