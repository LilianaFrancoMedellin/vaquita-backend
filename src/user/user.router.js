import express from "express";
import { UserController } from "./user.controller.js";

class UserRouter {
  constructor() {
    this.userController = new UserController();
  }

  registerRoutes() {
    const router = express.Router();

    router.get("/:id", this.userController.get);
    router.post("/", this.userController.signUp);

    return router;
  }
}

export { UserRouter };
