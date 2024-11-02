import { User } from '../models/index.js';

export const index = async (req, res) => {
  try {
    const options = {};
    if (req.query?.with) {
      options.include = req.query?.with;
    }
    const users = await User.findAll(options);
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const show = async (req, res) => {
  const options = {};
  if (req.query?.with) {
    options.include = req.query?.with;
  }
  const user = await User.findByPk(req.params.user, options);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ data: user });
};

export const store = async (req, res) => {
  const user = await User.build(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json({ data: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const destroy = async (req, res) => {
  const user = await User.findByPk(req.params.user);
  try {
    await user.delete()
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
