const db = require('../db/database');
const { v4: uuidv4 } = require('uuid');

const addExpense = (expense) => {
  const id = uuidv4();
  const stmt = db.prepare(
    `INSERT INTO expenses (id, title, amount, date, cateory, userId) VALUES (?, ?, ?, ?, ?, ?)`
  );
  stmt.run(id, expense.title, expense.amount, expense.date, expense.category, expense.userId);
  return { id, ...expense };
};

const getExpensesByUser = (userId) => {
  const stmt = db.prepare(`SELECT * FROM expenses WHERE userId = ?`);
  return stmt.all(userId);
};

const getExpenseById = (id, userId) => {
  const stmt = db.prepare(`SELECT * FROM expenses WHERE id = ? AND userId = ?`);
  return stmt.all(id, userId);
};

const updateExpense = (id, userId, data) => {
  const stmt = db.prepare(
    `UPDATE expenses SET title = ?, amount = ?, date = ?, category = ? WHERE id = ? AND userId = ?`
  );
  const result = stmt.run(data.title, data.amount, data.date, data.category, id, userId);
  return result.changes > 0 ? { id, ...data, userId } : null;
};

const deleteExpense = (id, userId) => {
  const stmt = db.prepare(`DELETE FROM expenses WHERE id = ? AND userId = ?`);
  const result = stmt.run(id, userId);
  return result.changes > 0;
};

module.exports = { addExpense, getExpensesByUser, getExpenseById, updateExpense, deleteExpense };
