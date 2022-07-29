'use strict';
const {index} = require('../../models/product.model')
module.exports = {
  async up (queryInterface, Sequelize) {
    let products = index().map(product =>{
      delete product.image
      return Object({...product}) 
    })
      await queryInterface.bulkInsert('products', products , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
