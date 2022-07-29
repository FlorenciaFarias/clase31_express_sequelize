'use strict';

const {index} = require('../../models/user.model') 

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = index().map(user => Object({...user,avatar: null}))
      await queryInterface.bulkInsert('users', users , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    
  }
};
