const bcrypt = require('bcrypt');
const { addUser, getUserByUsername } = require('../services/userService');
const { registerSchema, loginSchema } = require('../validations/authValidations');
const { generateToken } = require('../utils/tokenUtils');

const register = async (request, h) => {
  const { error } = registerSchema.validate(request.payload);
  if (error) {
    return h.response({ message: error.message }).code(400);
  }

  const existing = getUserByUsername(request.payload.username);
  if (existing) {
    return h.response({ message: 'Username already exist' }).code(400);
  }

  const user = await addUser(request.payload);
  return h
    .response({ message: 'User registered', user: { id: user.id, username: user.username } })
    .code(201);
};

const login = async (request, h) => {
  const { error } = loginSchema.validate(request.payload);
  if (error) {
    return h.response({ message: error.message }).code(400);
  }

  const user = getUserByUsername(request.payload.username);
  if (!user) {
    return h.response({ message: 'Invalid credentials ' }).code(401);
  }

  const valid = await bcrypt.compare(request.payload.password, user.password);
  if (!valid) {
    return h.response({ message: 'Invalid credentials' }).code(401);
  }

  const token = generateToken(user);
  return h.response({ message: 'Login successful', token }).code(200);
};

module.exports = { register, login };
