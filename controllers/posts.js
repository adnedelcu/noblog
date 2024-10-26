import Post from '../models/post.js';

export const index = async (req, res) => {
  try {
    const options = {};
    if (req.query?.with) {
      options.include = req.query?.with;
    }
    const posts = await Post.findAll(options);
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const show = async (req, res) => {
  const options = {};
  if (req.query?.with) {
    options.include = req.query?.with;
  }
  const post = await Post.findByPk(req.params.id, options);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.status(200).json({ data: post });
};

export const store = async (req, res) => {
  const post = await Post.build(req.body);
  try {
    const newPost = await post.save();
    res.status(201).json({ data: newPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const destroy = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  try {
    await post.delete()
    res.status(201).json({ data: newPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
