'use strict';
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('Ownerships',{
            macAddress: {
              allowNull: false,
              primaryKey: true,
              type: Sequelize.STRING,
              references: {
                  model: 'Vehicles',
                  key: 'macAddress'
              }
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'userId'
                }
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
    down:(queryInterface, Sequelize) => {
        return queryInterface.dropTable('Ownerships');
    }
};