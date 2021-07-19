const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;

// db.run(`
// CREATE TABLE IF NOT EXISTS customers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     cpf TEXT,
//     birth DATE,
//     dateRegister DATE,
//     salary TEXT
// );
// `);
