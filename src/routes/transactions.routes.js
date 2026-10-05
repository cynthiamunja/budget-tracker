import express from 'express';
import * as transactionsController from '../controllers/transactions.controller.js';
import { validateId } from '../middleware/validateId.js';


const router = express.Router();

router.get('/getAllTransactions', transactionsController.getAllTransactions);
router.get('/summary', transactionsController.getSummary);
router.post('/createTransaction', transactionsController.createTransaction);
router.get('/getTransactionByID/:id',validateId, transactionsController.getTransactionByID);
router.put('/updateTransaction/:id', validateId, transactionsController.updateTransaction);
router.delete('/deleteTransaction/:id',validateId, transactionsController.deleteTransaction);


export default router;