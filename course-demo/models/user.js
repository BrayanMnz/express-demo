'use strict';
const bcrypt = require('bcryptjs'); // For hashing passwords

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'test@test.com',
        password: bcrypt.hashSync('123456', 10), // Hashing the password before storing
        address: 'Autopista Duarte',
        phoneNumber: '809-000-0000',
        terms: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@test.com',
        password: bcrypt.hashSync('password123', 10),
        address: 'Calle 15, Zona Norte',
        phoneNumber: '809-111-2222',
        terms: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sam Brown',
        email: 'sam.brown@test.com',
        password: bcrypt.hashSync('mypassword', 10),
        address: 'Avenida Independencia',
        phoneNumber: '809-333-4444',
        terms: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Emily White',
        email: 'emily.white@test.com',
        password: bcrypt.hashSync('securePassword', 10),
        address: 'Calle 6, Plaza Central',
        phoneNumber: '809-555-6666',
        terms: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@test.com',
        password: bcrypt.hashSync('carlo1234', 10),
        address: 'Calle Juan Pablo',
        phoneNumber: '809-777-8888',
        terms: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sophia Lee',
        email: 'sophia.lee@test.com',
        password: bcrypt.hashSync('sophia4321', 10),
        address: 'Avenida de los Prados',
        phoneNumber: '809-999-0000',
        terms: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lucas Martinez',
        email: 'lucas.martinez@test.com',
        password: bcrypt.hashSync('lucas8765', 10),
        address: 'Calle Central, Zona Sur',
        phoneNumber: '809-111-9999',
        terms: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Isabella Garcia',
        email: 'isabella.garcia@test.com',
        password: bcrypt.hashSync('isabella5678', 10),
        address: 'Avenida Los Conucos',
        phoneNumber: '809-222-3333',
        terms: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ethan Scott',
        email: 'ethan.scott@test.com',
        password: bcrypt.hashSync('ethan0987', 10),
        address: 'Calle Principal, Sector 4',
        phoneNumber: '809-444-5555',
        terms: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mia Johnson',
        email: 'mia.johnson@test.com',
        password: bcrypt.hashSync('miapass123', 10),
        address: 'Calle Los Laureles',
        phoneNumber: '809-666-7777',
        terms: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
