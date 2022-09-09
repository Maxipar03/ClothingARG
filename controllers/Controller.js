const { name } = require('ejs');
let { validationResult } = require('express-validator');
//const { Association } = require('sequelize/types');
let db = require("../database/models")

const Controller = {

    index: (req, res) => {
        let giveProduct = db.Product.findAll({include:[{association:"brands"},{association:"materials"},{association:"colors"}]})
        let giveimages = db.Image.findAll()
        
        Promise.all([giveProduct,giveimages])
        .then(function([products,images]){
            res.render("index",{products:products, images:images})
        })
        
    }


    }

module.exports = Controller
