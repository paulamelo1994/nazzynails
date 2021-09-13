const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        //userId: { type: DataTypes.INTEGER, allowNull: false}
    };

    return sequelize.define('Appointment', attributes);
}