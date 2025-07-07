const bcrypt = require('bcrypt');
const { addUser, getUserByUsername } = require('../../services/userService');
const { registerSchema, loginSchema } = require('../../validations/authValidations');
const { generateToken } = require('../../utils/tokenUtils');
const { response_success, response_fail } = require('../../utils/responseBuilder');

const register = async (request, h) => {
  const { error } = registerSchema.validate(request.payload);
  if (error) return response_fail(h, error.message);

  const existing = getUserByUsername(request.payload.username);
  if (existing) return response_fail(h, 'Username already exist');

  const user = await addUser(request.payload);
  return response_success(
    h,
    'User registered',
    { user: { id: user.id, username: user.username } },
    201
  );
};

const login = async (request, h) => {
  const { error } = loginSchema.validate(request.payload);
  if (error) return response_fail(h, error.message);

  const user = getUserByUsername(request.payload.username);
  if (!user) response_fail(h, 'Invalid credentials', 401);

  const valid = await bcrypt.compare(request.payload.password, user.password);
  if (!valid) response_fail(h, 'Invalid credentials', 401);

  const token = generateToken(user);
  return response_success(h, 'Login successful', { token });
};

module.exports = { register, login };
