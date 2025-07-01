const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const User = require('../models/user.model');

const register = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = await User.createUser({
    ...payload,
    password: hashedPassword
  });
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await User.findUserByEmail(email);
  if (!user) throw new Error('Email tidak ditemukan');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Password salah');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    jwtSecret,
    { expiresIn: '1d' }
  );

  delete user.password;
  return { user, token };
};

module.exports = { register, login };
