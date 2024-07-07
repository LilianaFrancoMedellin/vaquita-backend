import { ExpenseService } from '../services/expense.service.js';
import { StatusCodes } from 'http-status-codes';

const ExpenseController = () => {
  console.log(2, '[Expense] Controller');

  const expenseService = ExpenseService();

  const getAllByGroup = async (req, res) => {
    console.log(2.1, '[Expense] Controller Get All by Group');

    const expenses = await expenseService.getAllByGroup(req.params.groupId);

    return res.status(StatusCodes.OK).json({
      expenses,
    });
  };

  const create = async (req, res) => {
    console.log(2.1, '[Expense] Controller Create');

    const expense = await expenseService.create(req.body);

    return res.status(StatusCodes.CREATED).json(expense);
  };

  return {
    getAllByGroup,
    create,
  };
};

export { ExpenseController };
