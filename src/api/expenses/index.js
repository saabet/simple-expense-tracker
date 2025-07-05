const routes = require('./routes');

module.exports = {
  name: 'expenses',
  version: '1.0.0',
  register: async (server) => {
    server.route(routes);
  },
};
