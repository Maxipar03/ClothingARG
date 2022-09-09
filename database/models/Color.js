module.exports = function (sequelize, DataTypes) {
    let alias = "Color"
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
        tableName: "color",
        timestamps: false
    }

    let Color = sequelize.define(alias, cols, config)

    return Color
}