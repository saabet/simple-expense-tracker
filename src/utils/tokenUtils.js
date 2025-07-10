const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  const payload = { id: user.id, username: user.username };
  if (!secret) throw new Error('JWT_SECRET is not defined in environment variables');
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { generateToken, verifyToken };
