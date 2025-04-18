// File: src/routes/analytics.js
const express = require('express');
const { getTimeSeries } = require('../controllers/analyticsController');
const router = express.Router();

// GET /timeseries
router.get('/', getTimeSeries);

module.exports = router;
