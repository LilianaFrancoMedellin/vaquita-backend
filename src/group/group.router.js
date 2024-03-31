import express from "express";
import { GroupController } from "./group.controller.js";

class GroupRouter {
  constructor() {
    this.groupController = new GroupController();
  }

  registerRoutes() {
    const router = express.Router();

    router.get("/", this.groupController.get);
    router.get("/:id", this.groupController.getAll);
    router.post("/", this.groupController.create);
    router.put("/", this.groupController.edit);
    router.delete("/", this.groupController.delete);

    return router;
  }
}

export { GroupRouter };
