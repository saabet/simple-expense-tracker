const {
  addExpense,
  getExpensesByUser,
  getExpenseById,
  exportToCSV,
  updateExpense,
  deleteExpense,
} = require('../../services/expensesService');
const { expenseSchema } = require('../../validations/expenseValidation');
const { verifyToken } = require('../../utils/tokenUtils');
const { response_success, response_fail } = require('../../utils/responseBuilder');

const extractUserId = (request) => {
  const token = request.headers.authorization?.replace('Bearer ', '');
  const decoded = verifyToken(token);
  return decoded.id;
};

const createExpense = (request, h) => {
  const { error } = expenseSchema.validate(request.payload);
  if (error) return response_fail(h, error.message);

  const userId = extractUserId(request);
  const newExpense = addExpense({ ...request.payload, userId });
  return response_success(h, 'Expense created', { expense: newExpense }, 201);
};

const getAllExpenses = (request, h) => {
  const userId = extractUserId(request);
  const { startDate, endDate, category } = request.query;
  let filtered = getExpensesByUser(userId);

  if (startDate) filtered = filtered.filter((e) => new Date(e.date) >= new Date(startDate));
  if (endDate) filtered = filtered.filter((e) => new Date(e.date) <= new Date(endDate));
  if (category) filtered = filtered.filter((e) => e.category === category);

  return response_success(h, 'Expenses retrieved', { expenses: filtered });
};

const getExpense = (request, h) => {
  const userId = extractUserId(request);
  const expense = getExpenseById(request.params.id, userId);
  if (!expense) return response_fail(h, 'Expense not found', 401);
  return response_success(h, 'Expense found', { expense });
};

const summaryExpense = (request, h) => {
  const userId = extractUserId(request);
  const userExpenses = getExpensesByUser(userId);

  const total = userExpenses.reduce((acc, e) => acc + Number(e.amount), 0);

  const perCategory = {};
  userExpenses.forEach((e) => {
    perCategory[e.category] = (perCategory[e.category] || 0) + Number(e.amount);
  });

  return response_success(h, 'Summary generated', {
    total,
    perCategory,
    count: userExpenses.length,
  });
};

const exportExpenseToCSV = (request, h) => {
  const userId = extractUserId(request);
  const expenses = getExpensesByUser(userId);

  exportToCSV(expenses);
  return response_success(h, {message: 'CSV file saved to server', path: '/exports/expenses/expenses.csv' });
};

const editExpense = (request, h) => {
  const { error } = expenseSchema.validate(request.payload);
  if (error) return response_fail(h, error.message);

  const userId = extractUserId(request);
  const updated = updateExpense(request.params.id, userId, request.payload);
  if (!updated) return response_fail(h, 'Expense not found', 404);
  return response_success(h, 'Expense updated', { expense: updated });
};

const removeExpense = (request, h) => {
  const userId = extractUserId(request);
  const success = deleteExpense(request.params.id, userId);
  if (!success) return response_fail(h, 'Expense not found', 404);
  return response_success(h, 'Expense deleted');
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpense,
  summaryExpense,
  exportExpenseToCSV,
  editExpense,
  removeExpense,
};
