import { UserService } from "../services/user.service.js";

const UserController = () => {
  console.log(2, "[User] Controller");

  const userService = UserService();

  const getById = async (req, res) => {
    console.log(2.1, "[User] Controller Get By Id");

    const user = await userService.getById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${req.params.id} does not exist` });
    }

    return res.status(200).json({
      user,
    });
  };

  const create = async (req, res) => {
    console.log(2.1, "[User] Controller Create");

    const response = await userService.create(req.body);

    return res.status(200).json(response);
  };

  return {
    getById,
    create,
  };
};

export { UserController };
