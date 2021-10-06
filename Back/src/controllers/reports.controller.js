﻿const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const reportService = require('../services/report.service');
const { func } = require('joi');

// routes
router.get('/generate', authorize(), reportDateSchema, createReport);
router.post('/generateWeek', authorize(), reportDateSchema, getWeekData);
router.delete('/delete', authorize(), deleteReportSchema, deleteReport);

module.exports = router;

function reportDateSchema(req, res, next) {
    const schema = Joi.object({
        date: Joi.date().required()
    });
    validateRequest(req, next, schema);
}

function deleteReportSchema(req, res, next) {
    const schema = Joi.object({
        filename: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function createReport(req, res, next) {
    reportService.createReport(req.user, req.body)
        .then((report) => {
            res.send(report)
        })
        .catch(next);
}

function getWeekData(req, res, next){
    reportService.getDataWeek(req.user, req.body)
    .then((report) => {
        res.json(report)
    })
    .catch(next);
}

function deleteReport(req, res, next){
    reportService.deleteReport(req.body)
        .then(() => res.json({ message: 'Report deleted successfully' }))
        .catch(next);
}