const {
  addExpense,
  getExpensesByUser,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../../services/expensesService');
const { expenseSchema } = require('../../validations/expenseValidation');
const { verifyToken, verifyToken } = require('../../utils/tokenUtils');

const exttracUserId = (request) => {
  const token = request.headers.authorizaion?.replace('Bearer ', '');
  const decoded = verifyToken(token);
  return decoded.id;
};

const createExpense = (request, h) => {
  const { error } = expenseSchema.validate(request.payload);
  if (error) return h.response({ message: error.message }).code(400);

  const userId = exttracUserId(payload);
  const newExpense = addExpense({ ...request.payload, userId });
  return h.response({ message: 'Expense created', expense: newExpense }).code(201);
};

const getAllExpenses = (request, h) => {
  const userId = exttracUserId(request);
  const userExpenses = getExpensesByUser(userId);
  return h.response({ expenses: userExpenses }).code(200);
};

const getExpense = (request, h) => {
  const userId = exttracUserId(request);
  const expense = getExpenseById(request.params.id, userId);
  if (!expense) return h.response({ message: 'Not found' }).code(404);
  return h.response({ expense }).code(200);
};

const editExpense = (request, h) => {
  const userId = exttracUserId(request);
  const updated = updateExpense(request.params.id, userId, request.payload);
  if (!updated) return h.response({ message: 'Not found' }).code(404);
  return h.response({ message: 'Expense updated' }).code(200);
};

const removeExpense = (request, h) => {
  const userId = exttracUserId(request);
  const success = deleteExpense(request.params.id, userId);
  if (!success) return h.response({ message: 'Not found' }).code(404);
  return h.response({ message: 'Expense deleted' }).code(200);
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpense,
  editExpense,
  removeExpense,
};
