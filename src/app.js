import express from 'express';
import './data/db.js';
import transactionsRoutes from './routes/transactions.routes.js';
import categoriesRoutes from './routes/categories.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Budget tracker API is alive');
});

app.use('/transactions', transactionsRoutes);
app.use('/categories', categoriesRoutes);

export default app;