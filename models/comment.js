import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

export default class Comment extends Model {}

Comment.init({
  content: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Comment',
  underscored: true,
});
