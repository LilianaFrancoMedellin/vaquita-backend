import { UserModel } from '../models/user.model.js';

const userModel = UserModel();

const UserService = () => {
  console.log(3, '[User] Service');

  const getById = (id) => {
    console.log(3.1, '[User] Service Get By Id');

    return userModel.getById(id);
  };

  const create = async (newUser) => {
    console.log(3.1, '[User] Service Create');
    const createdUser = await userModel.create(newUser);

    return {
      newUser: createdUser,
      success: true,
      message: 'User created successfully',
      code: 201,
    };
  };

  const getByEmail = (email) => {
    console.log(3.1, '[User] Service Get By email');
    return userModel.getByEmail(email);
  };

  return {
    getById,
    create,
    getByEmail,
  };
};

export { UserService };
