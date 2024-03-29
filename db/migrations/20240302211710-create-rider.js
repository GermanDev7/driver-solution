'use strict';
const { RiderSchema } = require('../models/rider.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('riders', {
      ...RiderSchema,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('riders');
  }
};
