'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Clientes', [{
                telefono: '3132312321',
                nombre: 'Camila',
                apellido: 'Diaz',
                ultima_cita: null,
                usuarioId: '3126846268',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                telefono: '3196542724',
                nombre: 'Andres',
                apellido: 'Beltran',
                ultima_cita: null,
                usuarioId: '3126846268',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Clientes', null, {});
    }
};