module.exports = function (sequelize, DataTypes) {
    let alias = "CartProduct"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        product_id: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: "cartproduct",
        timestamps: false
    }

    let CartProduct = sequelize.define(alias, cols, config)

    CartProduct.associate = function (models) {
        CartProduct.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        });

        CartProduct.belongsTo(models.Product, {
            as: "products",
            foreignKey: "product_id"
        })
    }
    return CartProduct
}