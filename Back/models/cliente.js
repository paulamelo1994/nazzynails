'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'usuarioId'
            })
        }
    };
    Cliente.init({
        telefono: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        ultima_cita: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NULL
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'User',
                key: 'telefono',
                as: 'usuarioId'
            }
        }
    }, {
        sequelize,
        modelName: 'Cliente',
    });
    return Cliente;
};