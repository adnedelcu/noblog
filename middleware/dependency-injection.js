import { Comment, Post, User } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

export default async function (req, res, next) {
  for (let param in req.params) {
    switch (param) {
      case 'user':
        req.user = await User.findByPk(req.params[param]);
        if (!req.user) {
          next(new ApiError('Not found', 404));
        }

        break;

      case 'post':
        req.post = await Post.findByPk(req.params[param]);
        if (!req.post) {
          next(new ApiError('Not found', 404));
        }

        break;

      case 'comment':
        req.comment = await Comment.findByPk(req.params[param]);
        if (!req.comment) {
          next(new ApiError('Not found', 404));
        }

        break;
    }
  }

  next();
};
