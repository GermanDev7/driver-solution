'use strict';

/** @type {import('sequelize-cli').Migration} */

const { PaymentSchema } = require('../models/payment.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      ...PaymentSchema,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
