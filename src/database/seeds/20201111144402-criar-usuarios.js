'use strict';
const bcrypt = require('bcrypt');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Luiz',
      email: 'luiz1@gmail.com',
      password_hash: await bcrypt.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Caio',
      email: 'caio1@gmail.com',
      password_hash: await bcrypt.hash('dasdsa', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'felipe',
      email: 'falipe@gmail.com',
      password_hash: await bcrypt.hash('1dsadasdsa23456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },],
    {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
