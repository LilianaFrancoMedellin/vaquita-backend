import Router from "express-promise-router";
import { GroupController } from "../controllers/group.controller.js";
import continueDecorator from "../lib/continue.decorator.js";
import {
  connectDatabase,
  commitDatabase,
  rollbackDatabase,
} from '../router/middlewares/database.middleware.js'

const GroupRouter = () => {
  const groupController = GroupController();
  console.log(1, "[Group] Router");

  const registerRoutes = () => {
    const router = Router();
    console.log(1.1, "[Group] Routes Registered");

    router.use(connectDatabase);
    router.get("/:id", continueDecorator(groupController.getById));
    router.get("/", continueDecorator(groupController.getAll));
    router.post("/", continueDecorator(groupController.create));
    router.put("/:id", groupController.editById);
    router.delete("/:id", groupController.removeById);
    router.use(commitDatabase);
    router.use(rollbackDatabase);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { GroupRouter };
