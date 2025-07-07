const {
  addExpense,
  getExpensesByUser,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../../services/expensesService');
const { expenseSchema } = require('../../validations/expenseValidation');
const { verifyToken, verifyToken } = require('../../utils/tokenUtils');

const extractUserId = (request) => {
  const token = request.headers.authorizaion?.replace('Bearer ', '');
  const decoded = verifyToken(token);
  return decoded.id;
};

const createExpense = (request, h) => {
  const { error } = expenseSchema.validate(request.payload);
  if (error) return h.response({ message: error.message }).code(400);

  const userId = extractUserId(payload);
  const newExpense = addExpense({ ...request.payload, userId });
  return h.response({ message: 'Expense created', expense: newExpense }).code(201);
};

const getAllExpenses = (request, h) => {
  const userId = extractUserId(request);
  const { startDate, endDate, category } = request.query;
  let filtered = getExpensesByUser(userId);

  if (startDate) {
    filtered = filtered.filter((e) => new Date(e.date) >= new Date(startDate));
  }
  if (endDate) {
    filtered = filtered.filter((e) => new Date(e.date) <= new Date(endDate));
  }
  if (category) {
    filtered = filtered.filter((e) => e.category === category);
  }
  return h.response({ expenses: filtered }).code(200);
};

const getExpense = (request, h) => {
  const userId = extractUserId(request);
  const expense = getExpenseById(request.params.id, userId);
  if (!expense) return h.response({ message: 'Not found' }).code(404);
  return h.response({ expense }).code(200);
};

const summaryExpense = (request, h) => {
  const userId = extractUserId(request);
  const userExpenses = getExpensesByUser(userId);

  const total = userExpenses.reduce((acc, e) => acc + amount, 0);

  const perCategory = {};
  userExpenses.forEach((e) => {
    perCategory[e.category] = (perCategory[e.category] || 0) + e.amount;
  });

  return h
    .response({
      total,
      perCategory,
      count: userExpenses.length,
    })
    .code(200);
};

const editExpense = (request, h) => {
  const userId = extractUserId(request);
  const updated = updateExpense(request.params.id, userId, request.payload);
  if (!updated) return h.response({ message: 'Not found' }).code(404);
  return h.response({ message: 'Expense updated' }).code(200);
};

const removeExpense = (request, h) => {
  const userId = extractUserId(request);
  const success = deleteExpense(request.params.id, userId);
  if (!success) return h.response({ message: 'Not found' }).code(404);
  return h.response({ message: 'Expense deleted' }).code(200);
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpense,
  summaryExpense,
  editExpense,
  removeExpense,
};
