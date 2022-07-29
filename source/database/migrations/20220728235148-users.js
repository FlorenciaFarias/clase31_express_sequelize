'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('users', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        username: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.TEXT
        },
        avatar: {
          type: Sequelize.INTEGER,
          allowNull:true
        },
        isAdmin:{
          type: Sequelize.BOOLEAN,
          defaultValue:false
        }
      });

    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
