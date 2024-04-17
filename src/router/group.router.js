import Router from "express-promise-router";
import { GroupController } from "../controllers/group.controller.js";
import transactionalDecorator from "../lib/transactional.decorator.js";

const GroupRouter = () => {
  const groupController = GroupController();
  console.log(1, "[Group] Router");

  const registerRoutes = () => {
    const router = Router();
    console.log(1.1, "[Group] Routes Registered");

    router.get("/:id", transactionalDecorator(groupController.getById));
    router.get("/", transactionalDecorator(groupController.getAll));
    router.post("/", transactionalDecorator(groupController.create));

    return router;
  };

  return {
    registerRoutes,
  };
};

export { GroupRouter };
