module.exports = function (sequelize, DataTypes) {
    let alias = "Products"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50)
        },
        brand_id: {
            type: DataTypes.INTEGER
        },
        material_id: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING(500)
        }
    }
    let config ={
        tableName: "products",
        timestamps: false,
    }

    let Product = sequelize.define(alias, cols, config)

    Product.associate = function(models){
        Product.belongsTo(models.Material,{
            as: "materials",
            foreignKey: "material_id"
        })
    
        Product.belongsTo(models.Brand,{
            as: "brands",
            foreignKey: "brand_id"
        }) 
    
        Product.belongsTo(models.Color,{
            as: "colors",
            foreignKey: "color_id"
        })
    
    }
    return Product
}