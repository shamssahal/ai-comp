const router = require('express').Router();
const { handleGenerate } = require('../controllers/generateController');

// POST /generate
router.post('/', handleGenerate);

module.exports = router;