const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const { setupModels } = require('./../db/models');
const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
      host: config.dbHost,
      port:config.dbPort,
      dialect: config.dialect,
      logging: console.log
  }
);

setupModels(sequelize);


module.exports = sequelize;
