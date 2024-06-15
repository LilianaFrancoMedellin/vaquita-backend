import express from 'express';
import { UserController } from '../controllers/user.controller.js';

const UserRouter = () => {
  const userController = UserController();
  console.log(1, '[User] Router');

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, '[User] Routes Registered');

    router.get('/', userController.getAll);
    router.get('/:id', userController.getById);
    router.post('/', userController.create);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { UserRouter };
