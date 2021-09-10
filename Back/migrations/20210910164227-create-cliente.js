'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Clientes', {
            telefono: {
                primaryKey: true,
                type: Sequelize.STRING
            },
            nombre: {
                type: Sequelize.STRING
            },
            apellido: {
                type: Sequelize.STRING
            },
            ultima_cita: {
                type: Sequelize.DATE
            },
            usuarioId: {
                type: Sequelize.STRING,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'telefono',
                    as: 'usuarioId'
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Clientes');
    }
};