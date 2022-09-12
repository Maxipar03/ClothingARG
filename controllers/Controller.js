const {
    name
} = require('ejs');
let {
    validationResult
} = require('express-validator');
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
            }]
        })
        let giveimages = db.Image.findAll()

        Promise.all([giveProduct, giveimages])
            .then(function ([products, images]) {
                res.render("index", {
                    products: products,
                    images: images
                })
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
                .then(function ([brand,color,material]) {
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
            })

            res.redirect("/")

        }

    },
}
module.exports = Controller