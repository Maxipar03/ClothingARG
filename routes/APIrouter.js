const express = require('express');
const router = express.Router();
const Controller = require('../controllers/APIcontroller')


//Aca van las rutas de tu API

router.get("/products",Controller.list)
router.get("/products/:id",Controller.show)

module.exports = router;
