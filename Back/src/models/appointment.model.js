const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.INTEGER, allowNull: false},
        clientId: { type: DataTypes.INTEGER, allowNull: false}, 
        time: { type: DataTypes.DATE, allowNull: false},
        serviceList: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false}, 
        appointmentIsDone: {type: DataTypes.BOOLEAN, allowNull: false},
        enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
    };

    return sequelize.define('Appointment', attributes);
}