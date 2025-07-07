const expenses = [];

const addExpense = ({ title, amount, category, date, userId }) => {
  const expense = {
    id: `${Date.now()}`,
    title,
    amount,
    category,
    date,
    userId,
  };
  expenses.push(expense);
  return expense;
};

const getExpensesByUser = (userId) => expenses.filter((e) => e.userId === userId);

const getExpenseById = (id, userId) => {
  return expenses.find((e) => e.id === id && e.userId === userId);
};

const updateExpense = (id, userId, data) => {
  const index = expenses.findIndex((e) => e.id === id && e.userId === userId);
  if (index === -1) return null;
  expenses[index] = { ...expenses[index], ...data };
  return expenses[index];
};

const deleteExpense = (id, userId) => {
  const index = expenses.findIndex((e) => e.id === id && e.userId === userId);
  if (index === -1) return false;
  expenses.splice(index, 1);
  return true;
};

module.exports = { addExpense, getExpensesByUser, getExpenseById, updateExpense, deleteExpense };
