const { register, login } = require('./handler');

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
];

module.exports = routes;
