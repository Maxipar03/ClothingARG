module.exports = function (sequelize, DataTypes) {
    let alias = "Image"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER
        }
    }
    let config ={
        tableName: "images",
        timestamps: "false"
    }

    let Image = sequelize.define(alias, cols, config)

    return Image
}