const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
    };

    const options = {
        defaultScope: {

            attributes: { exclude: ['hash'] }
        },
        scopes: {
            
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}