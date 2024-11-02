import ApiError from '../utils/ApiError.js';
import { Post, User } from '../models/index.js';

export const index = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({ data: req.user.posts });

      return;
    }

    const options = { order: [['created_at', 'DESC']] };
    if (req.query?.with) {
      options.include = req.query?.with;
      if (options.include == 'all') {
        options.include = { all: true, nested: true };
      }
    }

    const posts = await Post.findAll(options);

    res.status(200).json({ data: posts });
  } catch (error) {
    throw new ApiError(error.message);
  }
};

export const show = async (req, res) => {
  if (req.user) {
    const post = req.user.posts(post => post.id = req.params.post);
    res.status(200).json({ data: post });

    return;
  }

  let options = {};
  if (req.query?.with) {
    options.include = req.query?.with;
    if (options.include == 'all') {
      options = { include: { all: true, nested: true } };
    }
  }

  const post = await Post.findByPk(req.params.post, options);

  if (!post) {
    throw new ApiError('Not found', 404);
  }
  return res.status(200).json({ data: post });
};

export const store = async (req, res) => {
  if (!req.user) {
    throw new ApiError('Not allowed', 403);
  }
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
  if (!req.user) {
    throw new ApiError('Not allowed', 403);
  }
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
