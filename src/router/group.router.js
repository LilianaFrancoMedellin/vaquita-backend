import express from 'express';
import { GroupController } from '../controllers/group.controller.js';
import groupsSchemaValidation from '../validations/groups.schema.validation.js';
import validateSchema from '../middlewares/validate-schema.middleware.js';

const GroupRouter = () => {
  const groupController = GroupController();
  console.log(1, '[Group] Router');

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, '[Group] Routes Registered');

    router.get('/:id', groupController.getById);
    router.get('/', groupController.getAll);
    router.post('/', validateSchema(groupsSchemaValidation), groupController.create);
    router.put('/:id', validateSchema(groupsSchemaValidation), groupController.editById);
    router.delete('/:id', groupController.removeById);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { GroupRouter };
