import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbPath =
  process.env.NODE_ENV === 'test' ? ':memory:' : path.join(__dirname, 'budget.db');

const db = new Database(dbPath);


db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount REAL NOT NULL CHECK (amount > 0),
    category_id INTEGER NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )
`);

export default db;