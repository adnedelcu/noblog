import { Model, DataTypes } from 'sequelize';
import db from '../db/index.js';
import User from './user.js';

class Post extends Model {}
Post.init({
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  cover: DataTypes.STRING
}, {
  sequelize: db,
  modelName: 'Post',
  underscored: true,
});
Post.belongsTo(User, { as: 'author' });

export default Post;
