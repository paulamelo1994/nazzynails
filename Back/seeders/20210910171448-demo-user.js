'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Users', [{
            telefono: '3126846268',
            username: 'Juan',
            password: 'pass',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Users', null, {});
    }
};