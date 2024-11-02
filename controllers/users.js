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
