let db = require("../database/models")

const APIcontroller = {

    list: (req,res) => {
       db.Product.findAll()
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
    }
    
    }
    
module.exports = APIcontroller