'use strict';
const { RideSchema } = require('../models/ride.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rides', {
      ...RideSchema,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('rides');
  }
};
