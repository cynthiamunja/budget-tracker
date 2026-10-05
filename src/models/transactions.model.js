import db from '../data/db.js';

export function getAll() {
  return db.prepare(`
    SELECT
      transactions.id,
      transactions.type,
      transactions.amount,
      categories.name AS category,
      transactions.description,
      transactions.date
    FROM transactions
    JOIN categories ON transactions.category_id = categories.id
    ORDER BY transactions.date DESC
  `).all();
}

export function create({ type, amount, category_id, description, date }) {
  const result = db
    .prepare(
      `INSERT INTO transactions (type, amount, category_id, description, date)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(type, amount, category_id, description, date);

  return getById(result.lastInsertRowid);
}
export function getById(id) {
  return db.prepare(`
    SELECT
      transactions.id,
      transactions.type,
      transactions.amount,
      categories.name AS category,
      transactions.description,
      transactions.date
    FROM transactions
    JOIN categories ON transactions.category_id = categories.id
    WHERE transactions.id = ?
  `).get(id);
}
export function update(id,{type, amount, category_id, description, date}){
  const result =db
  .prepare(
    `UPDATE transactions 
    SET type =?, amount=?, category_id=?, description=?, date=?
    where id=?`
  ).run(type, amount, category_id, description, date, id);

  if (result.changes===0){
    return undefined
  }

  return getById(id);
}


function remove(id) {
  const result = db.prepare('DELETE FROM transactions WHERE id = ?').run(id);
  return result.changes > 0;
}
export function getSummary() {
  const row = db
    .prepare(
      `SELECT
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) AS totalIncome,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS totalExpenses
       FROM transactions`
    )
    .get();

  return {
    totalIncome: row.totalIncome,
    totalExpenses: row.totalExpenses,
    balance: row.totalIncome - row.totalExpenses,
  };
}
export {remove };