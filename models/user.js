import sequelize from '../db/index.js';
import { Model, DataTypes } from 'sequelize';

export default class User extends Model {}

User.init({
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'User',
  underscored: true,
});
