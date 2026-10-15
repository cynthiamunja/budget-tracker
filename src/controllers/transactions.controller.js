import * as transactionsModel from '../models/transactions.model.js';
import * as categoriesModel from '../models/categories.model.js';


export function getAllTransactions(req, res) {
  const { type, category_id, from, to } = req.query;

  if (type && !['income', 'expense'].includes(type)) {
    return res.status(400).json({ error: "type must be 'income' or 'expense'" });
  }

  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (from && !dateFormat.test(from)) {
    return res.status(400).json({ error: 'from must be in YYYY-MM-DD format' });
  }
  if (to && !dateFormat.test(to)) {
    return res.status(400).json({ error: 'to must be in YYYY-MM-DD format' });
  }

  const filters = {};
  if (type) filters.type = type;
  if (category_id) filters.category_id = Number(category_id);
  if (from) filters.from = from;
  if (to) filters.to = to;

  const transactions = transactionsModel.getAll(filters);
  res.json(transactions);
}
function validateTransaction({type, amount, category_id,date}){
  if(!['income','expense'].includes(type)){
    return " type must be 'income' or 'expense'";
  }
  if (typeof amount !=='number'|| amount <=0){
    return 'amount must be a positive number'
  }
  if (!Number.isInteger(category_id) || category_id < 1){
    return 'category_id must be a positive integer'

  }
  if (!categoriesModel.getById(category_id)){
    return 'category_id does not refer to an existing category '
  }
  if (typeof date!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)){
    return 'date must be in YYYY-MM-DD formart'
  }
  return null
}


export function createTransaction(req, res){
  const {type, amount, category_id, description, date}=req.body;

  const error=validateTransaction({type, amount, category_id, date})
  if (error){
    return res.status(400).json({error})
  }

  const transaction=transactionsModel.create({
    type,
    amount, 
    category_id,
    description:description ?? null,
    date,
  });
  res.status(201).json(transaction)


}
export function getTransactionByID(req, res) {
  const transaction = transactionsModel.getById(req.id);

  if (!transaction) {
    return res.status(404).json({ error: 'transaction not found' });
  }

  res.json(transaction);
}
export function updateTransaction(req, res) {
  const { type, amount, category_id, description, date } = req.body;

  const error = validateTransaction({ type, amount, category_id, date });
  if (error) {
    return res.status(400).json({ error });
  }

  const transaction = transactionsModel.update(req.id, {
    type,
    amount,
    category_id,
    description: description ?? null,
    date,
  });

  if (!transaction) {
    return res.status(404).json({ error: 'transaction not found' });
  }

  res.json(transaction);
}

export function deleteTransaction(req, res) {
  const deleted = transactionsModel.remove(req.id);

  if (!deleted) {
    return res.status(404).json({ error: 'transaction not found' });
  }

  res.status(204).send();
}
export function getSummary(req, res) {
  
  const summary = transactionsModel.getSummary();
  res.json(summary);
}

