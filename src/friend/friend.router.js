import express from "express";
import { FriendController } from "./friend.controller.js";

class FriendRouter {
  constructor() {
    this.friendController = new FriendController();
  }

  registerRoutes() {
    const router = express.Router();

    router.get("/", this.friendController.get);
    router.get("/:id", this.friendController.getAll);
    router.post("/", this.friendController.create);
    router.put("/", this.friendController.edit);
    router.delete("/", this.friendController.delete);

    return router;
  }
}

export { FriendRouter };
