'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.Chapter)
      Lesson.belongsTo(models.Course)
      Lesson.belongsToMany(models.Admin, { through: 'AdminCourse' })
    }
  };
  Lesson.init({
    chapterNumber: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    chapterId: DataTypes.INTEGER,
    lessonName: DataTypes.STRING,
    lessonNumber: DataTypes.INTEGER,
    video: DataTypes.STRING,
    videoDuration: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};