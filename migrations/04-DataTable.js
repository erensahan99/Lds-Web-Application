'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Data', {
            dataId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            macAddress: {
                allowNull: false,
                type: Sequelize.STRING,
                references: {
                    model: 'Vehicles',
                    key: 'macAddress'
                }
            },
            dataName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            data: {
                allowNull: false,
                type: Sequelize.STRING
            },
            time: {
                allowNull: false,
                type: 'TIMESTAMP'
            }
        }, {
            timestamps: false,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Data');
    }
};