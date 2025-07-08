const Database = require('better-sqlite3');
const db = new Database('./data/expenses.db', { verbose: console.log });

db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category TEXT NOT NULL,
        userId TEXT NOT NULL
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );    
`);

module.exports = db;
