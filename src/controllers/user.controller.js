import { UserService } from "../services/user.service.js";

const UserController = () => {
  console.log(2, "[User] Controller");
  const userService = UserService();

  const getById = (_req, res) => {
    console.log(2, "[User] Controller Get");
    userService.getById(123);
    return res.status(200).send();
  };

  const signIn = (req, res) => {
    console.log(2.1, "[User] Controller signIn");
    userService.getById(123);
    return res.status(200).send();
  };

  const signUp = (req, res) => {
    console.log(2.1, "[User] Controller signUp");
    userService.create({});
    return res.status(201).send();
  };

  return {
    getById,
    signIn,
    signUp,
  };
};

export { UserController };
