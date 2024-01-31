'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CustomerCourse.init({
    customerId: DataTypes.INTEGER,
    coursesId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CustomerCourse',
  });
  return CustomerCourse;
};