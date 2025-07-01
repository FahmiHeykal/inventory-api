const AuthService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ message: 'Register berhasil', data: user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json({ message: 'Login berhasil', ...result });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = { register, login };
