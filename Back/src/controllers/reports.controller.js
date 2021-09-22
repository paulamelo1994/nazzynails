const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const reportService = require('../services/report.service');

// routes
router.get('/generate', authorize(), reportDateSchema, createReport);

module.exports = router;

function reportDateSchema(req, res, next) {
    const schema = Joi.object({
        date: Joi.date().required()
    });
    validateRequest(req, next, schema);
}

function createReport(req, res, next) {
    reportService.createReport(req.user, req.body)
        .then((report) => {
            res.download(report.filename)
        })
        .catch(next);
}