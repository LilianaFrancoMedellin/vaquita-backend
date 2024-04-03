import express from "express";
import { GroupController } from "../controllers/group.controller.js";

const GroupRouter = () => {
  const groupController = GroupController();
  console.log(1, "[Group] Router");

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, "[Group] Routes Registered");

    router.get("/:id", groupController.getById);
    router.get("/", groupController.getAll);
    router.post("/", groupController.create);
    router.put("/", groupController.editById);
    router.delete("/", groupController.removeById);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { GroupRouter };
