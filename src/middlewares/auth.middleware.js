const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const auth = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token tidak diberikan' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Akses ditolak (unauthorized role)' });
      }

      next();
    } catch (err) {
      console.error('[AUTH] JWT Error:', err.message);
      return res.status(401).json({ error: 'Token tidak valid' });
    }
  };
};

module.exports = auth;
