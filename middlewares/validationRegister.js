let {
  body
} = require('express-validator');
let db = require("../database/models");

const validationRegister = [

  body("first_name").notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .isLength({
    min: 5,
    max: 60
  }).withMessage("El nombre debe tener entre 5 y 60 caracteres"),
  body("last_name").notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .isLength({
    min: 5,
    max: 60
  }).withMessage("El apellido debe tener entre 5 y 60 caracteres"),
  body("username").notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .isLength({
    min: 10,
    max: 300
  }).withMessage("La descripcion debe tener entre 10 y 300 caracteres").bail()
  .custom(async (value, {
    req
  }) => {
    let username = req.body.username


    const user = await db.User.findOne({

      where: {
        username: username
      }
    })

    if (user) {
      throw new Error('El nombre de usuario ya se encuentra en uso')
    }
  }),
  body("email").notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .isEmail().withMessage("Este campo debe ser un email valido").bail()
  .custom(async (value, {
    req
  }) => {
    let email = req.body.email


    const user = await db.User.findOne({

      where: {
        email: email
      }
    })

    if (user) {
      throw new Error('El email ya se encuentra registrado')
    }


  }),
  body("password").notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  }).withMessage("la contraseña debe contener al menos 8 caracteres, un caracter en mayuscula, algun caracter especial y algun numero"),
  body("confirm_password").notEmpty().withMessage("Este campo no puede estar vacio").bail()
  .custom((value, {
    req
  }) => {
    let pass = req.body.password
    let pass2 = req.body.confirm_password
    if (pass != pass2) {
      throw new Error('Las contraseñas deben coincidir')
    }
    return true
  }),
]

module.exports = validationRegister;