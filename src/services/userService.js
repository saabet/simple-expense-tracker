const db = require('../db/database');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const addUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();
  const stmt = db.prepare(`INSERT INTO users (id, username, password) VALUES (?, ?, ?)`);
  stmt.run(id, username, hashedPassword);
  return { id, username };
};

const getUserByUsername = (username) => {
  const stmt = db.prepare(`SELECT * FROM users WHERE username = ?`);
  return stmt.get(username);
};

const getUserById = (id) => {
  const stmt = db.prepare(`SELECT * FROM users WHERE id = ?`);
  return stmt.get(id);
};

module.exports = { addUser, getUserByUsername, getUserById };
