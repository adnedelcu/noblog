import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

export const register = async (req, res, next) => {
  const user = await User.build(req.body);
  user.password = await bcrypt.hash(req.body.password, 10);
  try {
    const newUser = await user.save();
    const secret = process.env.JWT_SECRET;
    const payload = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    };
    const tokenOptions = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, tokenOptions);

    res.json({ data: { token } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  if (await bcrypt.compare(req.body.password, user.password) != true) {
    throw new ApiError('Invalid credentials', 401);
  }

  const secret = process.env.JWT_SECRET;
  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
  const tokenOptions = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret, tokenOptions);

  res.json({ data: { token }})
};
