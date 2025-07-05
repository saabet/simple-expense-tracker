require('dotenv').config();
const Hapi = require('@hapi/hapi');
const authPlugin = require('./api/auth');
const expensesPlugin = require('./api/expense');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: rocess.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([authPlugin, expensesPlugin]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
