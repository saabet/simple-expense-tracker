const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user.id, username: user.username };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 'id' });
};

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { generateToken, verifyToken };
