const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.INTEGER, allowNull: false},
        name: { type: DataTypes.STRING, allowNull: false },
        length: { type: DataTypes.INTEGER, allowNull: false },
        enable: { type: DataTypes.BOOLEAN, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false }
    };

    return sequelize.define('Service', attributes);
}