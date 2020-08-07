'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Vehicles', {
            vehicleId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            alias: {
                allowNull: false,
                type: Sequelize.STRING
            },
            macAddress: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true
            },
            color: {
                allowNull: false,
                type: Sequelize.TINYINT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Vehicles');
    }
};