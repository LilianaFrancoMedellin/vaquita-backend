import express from 'express';
import { ExpenseController } from '../controllers/expense.controller.js';

const ExpenseRouter = () => {
  const expenseController = ExpenseController();
  console.log(1, '[Expense] Router');

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, '[Expense] Routes Registered');

    router.get('/:groupId', expenseController.getAllByGroup);
    router.post('/', expenseController.create);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { ExpenseRouter };
