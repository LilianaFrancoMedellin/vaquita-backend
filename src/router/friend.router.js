import express from "express";
import { FriendController } from "../controllers/friend.controller.js";

const FriendRouter = () => {
  const friendController = FriendController();
  console.log(1, "[Friend] Router");

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, "[Friend] Routes Registered");

    router.get("/", friendController.getAll);
    router.get("/:id", friendController.getById);
    router.post("/", friendController.create);
    router.put("/", friendController.editById);
    router.delete("/", friendController.removeById);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { FriendRouter };
