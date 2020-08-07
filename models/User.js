'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        userId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isAdmin: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    return User;
}