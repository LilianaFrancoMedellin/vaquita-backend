import { ExpenseModel } from '../models/expense.model.js';
import { GroupModel } from '../models/group.model.js';
import { UserModel } from '../models/user.model.js';

const ExpenseService = () => {
  console.log(3, '[Expense] Service');

  const expenseModel = ExpenseModel();

  const getAllByGroup = (groupId) => {
    console.log(3.1, '[Expense] Service Get All By Group');

    return expenseModel.getAllByGroup(groupId);
  };

  const create = async (expense) => {
    console.log(3.1, '[Expense] Service Create');

    const groupModel = GroupModel();
    const countGroup = await groupModel.countById(expense.groupId);

    if (countGroup === 0) {
      throw new ConflictException('The group does not exists');
    }

    const userModel = UserModel();
    const existingUser = await userModel.getById(expense.ownerUserId);

    if (!existingUser) {
      throw new ConflictException('The user does not exists');
    }

    return expenseModel.create(expense);
  };

  return {
    getAllByGroup,
    create,
  };
};

export { ExpenseService };
