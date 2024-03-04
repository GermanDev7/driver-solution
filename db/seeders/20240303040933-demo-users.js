'use strict';
const { faker } = require('@faker-js/faker');

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insertions = [];
    const users = [];
    const riders = [];
    const drivers = [];

    // Create 20 seeds for users
    for (let i = 0; i < 20; i++) {
      users.push({
        username: faker.internet.userName(),
        password: bcrypt.hashSync('password', 10), // hash password
        full_name: faker.person.fullName(),
        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        sex:faker.person.sex(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // insert seeds of users and get your IDs
    const createdUsers = await queryInterface.bulkInsert('users', users, {
      returning: true,
    });

    for (let i = 0; i < 10; i++) {
      riders.push({
        user_id: createdUsers[i].id,
        preferred_payment_method:'TC',
        rating:0,
        ride_counts:0,
        is_available:true,
        created_at: new Date(),
        updated_at: new Date(),
      });

      drivers.push({
        user_id: createdUsers[i + 10].id,
        license_number:faker.commerce.isbn(10),
        rating:0,
        ride_counts:0,
        is_available:true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Insert seeds of riders and drivers
    await queryInterface.bulkInsert('riders', riders, {});
    await queryInterface.bulkInsert('drivers', drivers, {});

    return insertions;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Riders', null, {});
    await queryInterface.bulkDelete('Drivers', null, {});
  },
};
