'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Course', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adminId: {
        type: Sequelize.INTEGER
      },
      courseName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      contentText: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      totalLesson: {
        type: Sequelize.INTEGER
      },
      imgCourse: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Course');
  }
};