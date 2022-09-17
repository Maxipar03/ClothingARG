let db = require("../database/models")

const APIcontroller = {

    list: (req,res) => {
       db.Product.findAll({
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
       .then(products =>{
        return res.status(200).json({
            total: products.length,
            data: products,
            status: 200
        })
       }) 
    },
    show: (req,res) => {
        db.Product.findByPk(req.params.id)
       .then(product =>{
        return res.status(200).json({
            data: product,
            status: 200
        })
       })
    },
    brandList: (req,res) =>{
        db.Brand.findAll({
            include: [{
                association: "products"
            }]
        })
        .then(brands =>{
            return res.status(200).json({
                total: brands.length,
                data: brands,
                status: 200
            })
           }) 
    },
    lastProduct: (req, res) => {
        db.Product.findAll({
                include: [{
                    association: "brands"
                }, {
                    association: "materials"
                }, {
                    association: "colors"
                }, {
                    association: "images"
                }],
                order: [["id" ,'DESC']],
                limit: 1
            })
            .then(products =>{
                return res.status(200).json({
                    total: products.length,
                    data: products,
                    status: 200
                })
               }) 
        }
    }
    
module.exports = APIcontroller