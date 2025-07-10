const { register, login, resetPassword } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: register,
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: login,
  },
  {
    method: 'POST',
    path: '/auth/reset-password',
    handler: resetPassword,
  },
];

module.exports = routes;
