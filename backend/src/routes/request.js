const router = require('express').Router();
const { getRequestById } = require('../controllers/requestController');

router.get('/:id', getRequestById);

module.exports = router;