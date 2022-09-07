const express = require('express');
const router = express.Router();
const Validation = require('../middlewares/validation');
const Controller = require('../controllers/Controller')

router.get('/', Controller.index); 


module.exports = router;
