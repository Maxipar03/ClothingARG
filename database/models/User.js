module.exports = function (sequelize, DataTypes) {
    let alias = "User"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(50)
        },
        last_name: {
            type: DataTypes.STRING(50)
        },
        username: {
            type: DataTypes.STRING(50)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        password: {
            type: DataTypes.STRING(50)
        },
        confirm_password: {
            type: DataTypes.STRING(50)
        }
    }
    let config ={
        tableName: "users",
        timestamps: false,
    }

    let User = sequelize.define(alias, cols, config)

    return User
}