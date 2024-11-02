import ApiError from '../utils/ApiError.js';
import { Comment, Post, User } from '../models/index.js';

export const index = async (req, res) => {
  try {
    const options = { include: { all: true, nested: true }};
    const user = await User.findByPk(req.params.user, options);
    if (!user) {
      throw new ApiError('Not found', 404);
    }
    const post = user.posts.find(post => post.id === req.params.post);
    if (!post) {
      throw new ApiError('Not found', 404);
    }

    res.status(200).json({ data: post.comments });
  } catch (error) {
    throw new ApiError(error.message, error?.statusCode || 500);
  }
};

export const show = async (req, res) => {
  const options = { include: { all: true, nested: true }};
  const post = await Post.findAll({
    where: {
      id: req.params.post,
      author_id: req.params.user,
    },
  }, options)[0];

  if (!post) {
    throw new ApiError('Not found', 404);
  }
  const comment = post.comments.find(comment => comment.id === req.params.id);
  return res.status(200).json({ data: comment });
};

export const store = async (req, res) => {
  const post = await Post.build(req.body);
  post.author_id = req.params.user;
  try {
    const newPost = await post.save();
    res.status(201).json({ data: newPost });
  } catch (error) {
    throw new ApiError(error.message, 400);
  }
};

export const destroy = async (req, res) => {
  const post = await Post.findAll({
    where: {
      id: req.params.id,
      author_id: req.params.user,
    },
  })[0];

  if (!post) {
    throw new ApiError('Not found', 404);
  }

  try {
    await post.delete()
    res.status(204).send();
  } catch (error) {
    throw new ApiError(error.message, 400);
  }
};
