import { UserModel } from '../models/user.model.js';

const UserService = () => {
  console.log(3, '[User] Service');

  const userModel = UserModel();

  const getAll = () => {
    console.log(3.1, '[User] Service Get By Id');

    return userModel.getAll();
  };

  const getById = (id) => {
    console.log(3.1, '[User] Service Get By Id');

    return userModel.getById(id);
  };

  const create = (newUser) => {
    console.log(3.1, '[User] Service Create');

    return userModel.create(newUser);
  };

  const getByEmail = (email) => {
    console.log(3.1, '[User] Service Get By email');

    return userModel.getByEmail(email);
  };

  return {
    getAll,
    getById,
    create,
    getByEmail,
  };
};

export { UserService };
