const { name } = require('ejs');
let { validationResult } = require('express-validator');
let db = require("../database/models")

const Controller = {

    index: (req, res) => {
        db.Products.findAll()
        .then(function(products){
            res.render("index",{products:products})
        })
        
    }


    }

module.exports = Controller
