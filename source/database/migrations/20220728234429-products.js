'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('products', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.INTEGER
        },
        description: {
          type: Sequelize.TEXT
        },
      });

    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};