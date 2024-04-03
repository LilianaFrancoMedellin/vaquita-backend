import express from "express";
import { UserController } from "../controllers/user.controller.js";

const UserRouter = () => {
  console.log(1, "[User] Router");
  const userController = UserController();

  const registerRoutes = () => {
    console.log(1.1, "[User] Routes Registered ");

    const router = express.Router();
    router.get("/:id", userController.getById);
    router.post("/", userController.signUp);
    return router;
  };
  return {
    registerRoutes,
  };
};

export { UserRouter };
