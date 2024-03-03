'use strict';
const { DriverSchema } = require('../models/driver.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('drivers', {
      ...DriverSchema,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('drivers');
  }
};
