const config = require('../config.json');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

    const { host, port, user, password, database } = config.database;
        
    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'postgres' });

    // init models and add them to the exported db object
    db.User = require('../models/user.model')(sequelize);
    db.Client = require('../models/client.model')(sequelize);
    db.Service = require('../models/service.model')(sequelize);
    db.Appointment = require('../models/appointment.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}