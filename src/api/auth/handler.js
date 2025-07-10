const bcrypt = require('bcrypt');
const { addUser, getUserByUsername } = require('../../services/userService');
const { registerSchema, loginSchema } = require('../../validations/authValidations');
const { generateToken } = require('../../utils/tokenUtils');
const { response_success, response_fail } = require('../../utils/responseBuilder');
const db = require('../../db/database');

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

const resetPassword = async (request, h) => {
  const { username, newPassword } = request.payload;
  const user = getUserByUsername(username);
  if (!user) return response_fail(h, 'User not found', 404);

  const hashed = await bcrypt.hash(newPassword, 10);
  stmt = db.prepare(`UPDATE users SET password = ? WHERE username = ?`);
  stmt.run(hashed, username);
  return response_success(h, 'Password reset successfully');
};

module.exports = { register, login, resetPassword };
