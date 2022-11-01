const express = require('express');
const router = express.Router();
const Validation = require('../middlewares/validation');
const ValidationRegister = require('../middlewares/validationRegister');
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const Controller = require('../controllers/Controller')

//Pagina main//
router.get('/', Controller.index); 

//Crear producto//
router.get("/create",authMiddleware,Controller.create)
router.post("/create",Validation,Controller.createProcess)

//Editar producto//
router.get("/edit/:id",authMiddleware,Controller.edit)
router.post("/edit/:id",Validation,Controller.editProcess)

//Eliminar producto//
router.post("/delete/:id",Controller.delete)

//Detalle de producto//
router.get("/products/detail/:id",Controller.detail)

//Pagina de registro//
router.get("/user/register",guestMiddleware,Controller.register)
router.post("/user/register",ValidationRegister,Controller.registerProcces)

//Pagina de login//
router.get("/user/login",guestMiddleware,Controller.login)
router.post("/user/login",Controller.loginProcces)

//Detalle de usuario//
router.get("/user/profile",authMiddleware,Controller.profile)

//Logout//
router.get("/user/logout",Controller.logout)

//Carrito//
router.post("/product/addCart/:id",authMiddleware,Controller.addCart)
router.get("/user/cart",authMiddleware,Controller.productcart)

//Buscar//
router.post("/search",Controller.search)


module.exports = router;
