const bcrypt = require('bcrypt');
const uuid = require('uuid');

require('dotenv').config()

'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const username = process.env.SEED_ADMIN_USERNAME;
        const password = process.env.SEED_ADMIN_PASSWORD;
        return queryInterface.bulkInsert('Users', [{
            userId: uuid.v4(),
            username: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(8),null),
            isAdmin: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', { username: username }, {});
    }
};