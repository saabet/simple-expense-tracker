const {
  createExpense,
  getAllExpenses,
  getExpense,
  summaryExpense,
  editExpense,
  removeExpense,
} = require('./handler');
const { wrapHandler } = require('../../utils/responseWrapper');

const routes = [
  {
    method: 'POST',
    path: '/expenses',
    handler: wrapHandler(createExpense),
  },
  {
    method: 'GET',
    path: '/expenses',
    handler: wrapHandler(getAllExpenses),
  },
  {
    method: 'GET',
    path: '/expenses/{id}',
    handler: wrapHandler(getExpense),
  },
  {
    method: 'GET',
    path: '/expenses/summary',
    handler: wrapHandler(summaryExpense),
  },
  {
    method: 'GET',
    path: '/categories',
    handler: () => ({
      categories: ['Makanan', 'Transportasi', 'Hiburan', 'Belanja', 'Lainnya'],
    }),
  },
  {
    method: 'PUT',
    path: '/expenses/{id}',
    handler: wrapHandler(editExpense),
  },
  {
    method: 'DELETE',
    path: '/expenses/{id}',
    handler: wrapHandler(removeExpense),
  },
];

module.exports = routes;
