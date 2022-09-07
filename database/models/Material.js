module.exports = function (sequelize, DataTypes) {
    let alias = "Material"
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
        tableName: "materials",
        timestamps: "false"
    }

    let Material = sequelize.define(alias, cols, config)

    return Material
}