import { UserModel } from "../models/user.model.js";

const userModel = UserModel();

const UserService = () => {
  console.log(3, "[User] Service");

  const getById = (id) => {
    console.log(id);
    console.log(3.1, "[User] Service Get By Id");

    return userModel.getById(id);
  };

  const create = async (newUser) => {
    console.log(newUser);
    console.log(3.1, "[User] Service Create");
    const createdUser = await userModel.create(newUser);

    return {
      newUser: createdUser,
      success: true,
      message: "User created successfully",
      code: 201,
    };
  };

  return {
    getById,
    create,
  };
};

export { UserService };
