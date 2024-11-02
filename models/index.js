import Comment from "./comment.js";
import Post from "./post.js";
import User from "./user.js";

Comment.hasMany(Comment, { foreignKey: 'parent_id', as: 'replies', sourceKey: 'id' });
Comment.belongsTo(Comment, { foreignKey: 'parent_id', as: 'parent', targetKey: 'id' });
Comment.belongsTo(User, { as: 'author' });
Comment.belongsTo(Post, { as: 'post' });

Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });
Post.belongsTo(User, { as: 'author', foreignKey: 'author_id' });

User.hasMany(Post, { foreignKey: 'author_id', as: 'posts' });
User.hasMany(Comment, { foreignKey: 'author_id', as: 'comments' });

export { Comment, Post, User };
