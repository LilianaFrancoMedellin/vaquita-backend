import express from 'express';
import { UserGroupController } from '../controllers/user-group.controller.js';
import userGroupSchemaValidation from '../validations/user-group.schema.validation.js';
import validateSchema from '../middlewares/validate-schema.middleware.js';

const UserGroupRouter = () => {
  const userGroupController = UserGroupController();
  console.log(1, '[User Group] Router');

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, '[User Group] Routes Registered');

    router.get('/:groupId', userGroupController.getAllUsersByGroupId);
    router.get('/users/:groupId', userGroupController.getAvailableUsersByGroupId);
    router.post('/', validateSchema(userGroupSchemaValidation), userGroupController.create);
    router.delete('/:id', userGroupController.removeById);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { UserGroupRouter };
