'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Chapter)
      Course.hasMany(models.Lesson)
      Course.belongsToMany(models.Customer, { through: 'CustomerCourse' })
      Course.belongsToMany(models.Admin, { through: 'AdminCourse' })
    }
  };
  Course.init({
    adminId: DataTypes.INTEGER,
    courseName: DataTypes.STRING,
    description: DataTypes.STRING,
    contentText: DataTypes.STRING,
    level: DataTypes.STRING,
    totalLesson: DataTypes.INTEGER,
    imgCourse: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};