'use strict';
const {index} = require('../../models/product.model')
module.exports = {
  async up (queryInterface, Sequelize) {
    let images = index().map(product =>{
      return Object({path: product.image}) 
    })
    await queryInterface.bulkInsert('images', images , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
   
  }
};
