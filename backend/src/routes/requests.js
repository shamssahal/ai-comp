const router = require('express').Router();
const { getRequests } = require('../controllers/requestsController');

router.get('/', getRequests);

module.exports = router;