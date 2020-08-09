'use strict';
module.exports = {
    up:(queryInterface,Sequelize) => {
        return queryInterface.createTable('Users',{
            userId: {
              allowNull: false,
              primaryKey: true,
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4  
            },
            username: {
                allowNull:false,
                unique: true,
                type: Sequelize.STRING
            },
            password: {
                allowNull:false,
                type: Sequelize.STRING
            },
            name: {
                allowNull:true,
                type: Sequelize.STRING
            },
            lastname: {
                allowNull:true,
                type: Sequelize.STRING
            },
            email: {
                allowNull:true,
                unique: true,
                type: Sequelize.STRING
            },
            isAdmin: {
                allowNull:true,
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        return queryInterface.dropTable('Users');
    }
};