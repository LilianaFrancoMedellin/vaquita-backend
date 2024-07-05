import { UserService } from '../services/user.service.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const UserController = () => {
  console.log(2, '[User] Controller');

  const userService = UserService();

  const getAll = async (req, res) => {
    console.log(2.1, '[User] Controller Get All');

    const users = await userService.getAll();

    return res.status(StatusCodes.OK).json({
      users,
    });
  };

  const getById = async (req, res) => {
    console.log(2.1, '[User] Controller Get By Id');

    const user = await userService.getById(req.params.id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `User with id ${req.params.id} does not exist` });
    }

    return res.status(StatusCodes.OK).json({
      user,
    });
  };

  const create = async (req, res) => {
    console.log(2.1, '[User] Controller Create');

    const user = await userService.create(req.body);

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(StatusCodes.CREATED).json({
      ...user,
      token,
    });
  };

  return {
    getAll,
    getById,
    create,
  };
};

export { UserController };
