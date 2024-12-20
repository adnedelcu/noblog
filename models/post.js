import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

export default class Post extends Model {}

Post.init({
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  cover: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Post',
  underscored: true,
});
