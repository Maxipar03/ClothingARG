let { body } = require('express-validator');

const validation = [ 

    body("name").notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isLength({min:5, max:10}).withMessage("El nombre debe tener entre 5 y 10 caracteres"),
    body("price").notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isNumeric().withMessage('El precio debe contener solo números'),
    body("description").notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isLength({min:30, max:300}).withMessage("La descripcion debe tener entre 30 y 300 caracteres"),
    body("image").notEmpty().withMessage("Este campo no puede estar vacio").bail()
    .isURL({protocols: ['http','https','ftp']}).withMessage("Debes ingresar una url valida"),
]

module.exports = validation;