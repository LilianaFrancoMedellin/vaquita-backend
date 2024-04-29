import express from "express";
import passport from "passport";
import { GroupController } from "../controllers/group.controller.js";

const GroupRouter = () => {
  const groupController = GroupController();
  console.log(1, "[Group] Router");

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, "[Group] Routes Registered");

    router.get("/:id", groupController.getById);
    router.get("/", groupController.getAll);
    router.post(
      "/",
      passport.authenticate("jwt", { session: false }),
      groupController.create
    );
    router.put("/:id", groupController.editById);
    router.delete("/:id", groupController.removeById);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { GroupRouter };
