'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imagesProducts', 
      [
        {
          product:1,
          image:1
        },
        {
          product:2,
          image:2
        },
        {
          product:3,
          image:3
        },
        {
          product:4,
          image:4
        }
      ],
     {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('imagesProducts', null, {});

  }
};
