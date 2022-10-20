const express = require('express');
const router = express.Router();
const Validation = require('../middlewares/validation');
const ValidationRegister = require('../middlewares/validationRegister');
const Controller = require('../controllers/Controller')

//Pagina main//
router.get('/', Controller.index); 

//Crear producto//
router.get("/create",Controller.create)
router.post("/create",Validation,Controller.createProcess)

//Editar producto//
router.get("/edit/:id",Controller.edit)
router.post("/edit/:id",Validation,Controller.editProcess)

//Eliminar producto//
router.post("/delete/:id",Controller.delete)

//Detalle de producto//
router.get("/products/detail/:id",Controller.detail)

//Pagina de registro//
router.get("/user/register",Controller.register)
router.post("/user/register",ValidationRegister,Controller.registerProcces)

//Pagina de login//
router.get("/user/login",Controller.login)
router.post("/user/login",Controller.loginProcces)

module.exports = router;
