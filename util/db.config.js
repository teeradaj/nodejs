const Sequelize = require('sequelize');
const env = require('../util/env');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import model
db.users = require('../src/model/users.js')(sequelize, Sequelize);
db.mean = require('../src/model/mean.js')(sequelize, Sequelize);

module.exports = db;