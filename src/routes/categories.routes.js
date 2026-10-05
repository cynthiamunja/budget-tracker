import express from 'express';
import * as categoriesController from '../controllers/categories.controller.js';
import { validateId } from '../middleware/validateId.js';


const router = express.Router();

router.get('/getAllCategories', categoriesController.getAllCategories);
router.post('/createCategory', categoriesController.createCategory);
router.put('/updateCategory/:id', validateId, categoriesController.updateCategory);
router.delete('/deleteCategory/:id', validateId, categoriesController.deleteCategory);


export default router;