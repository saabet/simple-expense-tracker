const {
  createExpense,
  getAllExpenses,
  getExpense,
  summaryExpense,
  editExpense,
  removeExpense,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/expenses',
    handler: createExpense,
  },
  {
    method: 'GET',
    path: '/expenses',
    handler: getAllExpenses,
  },
  {
    method: 'GET',
    path: '/expenses/{id}',
    handler: getExpense,
  },
  {
    method: 'GET',
    path: '/expenses/summary',
    handler: summaryExpense,
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
    handler: editExpense,
  },
  {
    method: 'DELETE',
    path: '/expenses/{id}',
    handler: removeExpense,
  },
];

module.exports = routes;
