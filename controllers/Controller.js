const {
    name
} = require('ejs');
let {
    validationResult
} = require('express-validator');
const { production } = require('../database/config/config');
//const { Association } = require('sequelize/types');
let db = require("../database/models")

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
        let giveProduct = db.Product.findByPk(req.params.id,{ include: [{
            association: "images"
        }]})
        let giveImages = db.Image.findByPk(req.params.id,{
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
            let giveProduct = db.Product.findByPk(req.params.id,{ include: [{
                association: "images"
            }]})
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
                },{
                    where:{
                        id: req.params.id
                    } 
                })
            })

            res.redirect("/")
        
    }
},
delete: function(req,res) {
    db.Product.destroy({
        where: {
            id: req.params.id
        }
    })
    db.Image.destroy({
        where:{
            id: req.params.id
        }
    })
    res.redirect("/")
}
}
module.exports = Controller