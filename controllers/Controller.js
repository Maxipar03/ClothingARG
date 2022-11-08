const {
    name
} = require('ejs');
let {
    validationResult
} = require('express-validator');
const {
    production
} = require('../database/config/config');
//const { Association } = require('sequelize/types');
const bcrypt = require("bcryptjs")
let db = require("../database/models")
const {Op} = require('sequelize')

const Controller = {

    index: (req, res) => {
        let giveProduct = db.Product.findAll({
            include: [{
                association: "brands"
            }, {
                association: "materials"
            }, {
                association: "colors"
            }, {
                association: "images"
            }]
        })
        let giveimages = db.Image.findAll(({
            include: [{
                association: "products"
            }]
        }))

        Promise.all([giveProduct, giveimages])
            .then(function ([products, images]) {
                res.render("index", {
                    products: products,
                    images: images
                })
                console.log(products[0].image)
            })

    },
    create: (req, res) => {
        db.Product.findAll()
        let giveProduct = db.Product.findAll({
            include: [{
                association: "brands"
            }, {
                association: "materials"
            }, {
                association: "colors"
            }]
        })
        let giveBrand = db.Brand.findAll()
        let giveColor = db.Color.findAll()
        let giveMaterial = db.Material.findAll()

        Promise.all([giveProduct, giveBrand, giveColor, giveMaterial])
            .then(function ([products, brand, color, material]) {
                return res.render("create", {
                    products: products,
                    brand: brand,
                    color: color,
                    material: material
                })
            })
    },
    createProcess: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            let giveBrand = db.Brand.findAll()
            let giveColor = db.Color.findAll()
            let giveMaterial = db.Material.findAll()

            Promise.all([giveBrand, giveColor, giveMaterial])
                .then(function ([brand, color, material]) {
                    return res.render("create", {
                        brand: brand,
                        color: color,
                        material: material,
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    })
                })
        } else {
            db.Product.create({
                name: req.body.name,
                brand_id: req.body.brand,
                color_id: req.body.color,
                material_id: req.body.material,
                price: req.body.price,
                description: req.body.description
            }).then(product => {
                db.Image.create({
                    product_id: product.id,
                    url: req.body.image
                })
            })

            res.redirect("/")

        }

    },
    edit: (req, res) => {
        let giveProduct = db.Product.findByPk(req.params.id, {
            include: [{
                association: "images"
            }]
        })
        let giveImages = db.Image.findByPk(req.params.id, {
            include: [{
                association: "products"
            }]
        })
        let giveBrand = db.Brand.findAll()
        let giveColor = db.Color.findAll()
        let giveMaterial = db.Material.findAll()

        Promise.all([giveProduct, giveImages, giveBrand, giveColor, giveMaterial])
            .then(function ([products, images, brand, color, material]) {
                res.render("edit", {
                    products: products,
                    images: images,
                    brand: brand,
                    color: color,
                    material: material
                })
            })

    },
    editProcess: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            console.log("🚀 ~ file: Controller.js ~ line 118 ~ resultValidation", resultValidation)
            let giveProduct = db.Product.findByPk(req.params.id, {
                include: [{
                    association: "images"
                }]
            })
            let giveImages = db.Image.findAll({
                include: [{
                    association: "products"
                }]
            })
            let giveBrand = db.Brand.findAll()
            let giveColor = db.Color.findAll()
            let giveMaterial = db.Material.findAll()

            Promise.all([giveProduct, giveImages, giveBrand, giveColor, giveMaterial])
                .then(function ([products, images, brand, color, material]) {
                    res.render("edit", {
                        products: products,
                        images: images,
                        brand: brand,
                        color: color,
                        material: material,
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    })
                })
        } else {
            db.Product.update({
                name: req.body.name,
                brand_id: req.body.brand,
                color_id: req.body.color,
                material_id: req.body.material,
                price: req.body.price,
                description: req.body.description
            }, {
                where: {
                    id: req.params.id
                }
            }).then(product => {
                db.Image.update({
                    product_id: product.id,
                    url: req.body.image
                }, {
                    where: {
                        id: req.params.id
                    }
                })
            })

            res.redirect("/")

        }
    },

    delete: function (req, res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        db.Image.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/")
    },

    detail: function (req, res) {
        db.Product.findByPk(req.params.id, {
            include: [{
                association: "brands"
            }, {
                association: "materials"
            }, {
                association: "colors"
            }, {
                association: "images"
            }]
        }).then(function (products) {
            res.render("detail", {
                products: products,
            })
        })
    },

    register: function (req, res) {
        res.render("register")
    },

    registerProcces: function (req, res) {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            console.log("🚀 ~ file: Controller.js ~ line 232 ~ resultValidation", resultValidation)
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
            db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                confirm_password: bcrypt.hashSync(req.body.confirm_password, 10)
            })
        }
        res.redirect("/user/login")
    },

    login: function (req, res) {
        res.render("login")
    },

    loginProcces: function (req, res) {
        let email = req.body.email
        db.User.findOne({
                where: {
                    email: email
                }
            })
            .then((userToLogin) => {
                if (userToLogin) {
                    let passwordValidation = bcrypt.compareSync(req.body.password, userToLogin.password);
                    console.log("🚀 ~ file: Controller.js ~ line 264 ~ .then ~ passwordValidation", passwordValidation)
                    if (passwordValidation) {
                        delete userToLogin.password
                        delete userToLogin.confirm_password
                        req.session.userLogged = userToLogin
                        if (req.body.rememberUser) {
                            res.cookie("email", req.body.email, {
                                maxAge: (1000 * 120)
                            })
                        }
                        return res.redirect("/user/profile")
                    } else {
                        res.render("login", {
                            errors: {
                                password: {
                                    msg: "La contraseña ingresada es incorrecta"
                                }
                            },
                            oldData: req.body
                        })
                    }
                } else {
                    res.render("login", {
                        errors: {
                            email: {
                                msg: "Este mail no se encuentra registrado"
                            }
                        },
                        oldData: req.body
                    })
                }
            })
    },
    
    profile: function (req, res) {
        res.render("userProfile", {
            user: req.session.userLogged
        })
    },

    logout: function (req,res) {
        req.session.destroy()
        res.redirect("/")
    },

    addCart: function(req,res){
        let product_id = req.params.id
        let user_id = req.session.userLogged.id

        db.CartProduct.findOne({
            where:{
                product_id: product_id
            }
        })
        .then(resultado =>{
            if(resultado === null){
                db.CartProduct.create({
                    user_id: user_id,
                    product_id: product_id
                })
            }
        })
        res.redirect("/")
    },

    productcart: function(req,res){
        let user_id = req.session.userLogged.id
        let total = 0

        let giveProducts = db.CartProduct.findAll({
            where: {
                user_id: user_id
            },
            include: [{association: "products"}] 
        })
        let giveImages = db.Image.findAll({
            include: [{
                association: "products"
            }]
        })
        let giveProduct = db.Product.findAll({
            include:[{
                association: "brands"
            }, {
                association: "materials"
            }, {
                association: "colors"
            }, {
                association: "images"
            }] 
        })
    
        Promise.all([giveProducts,giveImages,giveProduct])
        .then(function([products,images,product]){ 

        res.render("cart",{products:products,images:images ,product:product})
        })
        
    },
    search: function(req,res){
        let giveProduct = db.Product.findAll({
             where:{
                name: {[Op.like]: "%" + req.body.search + "%"}
            },
            include: [{
                association: "brands"
            }, {
                association: "materials"
            }, {
                association: "colors"
            }, {
                association: "images"
            }]
        })
        let giveImages = db.Image.findAll({
            include: [{
                association: "products"
            }]
        })
        Promise.all([giveProduct,giveImages])
        .then(function([products,images]){
            if(products == ""){
                let giveProducts = db.Product.findAll({include: [{
                    association: "brands"
                }, {
                    association: "materials"
                }, {
                    association: "colors"
                }, {
                    association: "images"
                }]
            })
            let giveImage = db.Image.findAll({
                include: [{
                    association: "products"
                }]
            })
            Promise.all([giveProducts,giveImage])
            .then(function([product,image]){
                    res.locals.errorSearch = "No se encontraron resultados para su busqueda "
                    res.render("search",{product,image})
            })
            } else {
                res.render("search",{products,images})
            }
        })
    },
}
module.exports = Controller