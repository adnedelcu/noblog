import db from '../db/index.js';
import { Model, DataTypes } from 'sequelize';

class User extends Model {}

User.init({
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  sequelize: db,
  modelName: 'User',
  underscored: true,
});

export default User;
