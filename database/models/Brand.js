module.exports = function (sequelize, DataTypes) {
    let alias = "Brand"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50)
        }
    }
    let config ={
        tableName: "brands",
        timestamps: "false"
    }

    let brand = sequelize.define(alias, cols, config)

    return brand
}