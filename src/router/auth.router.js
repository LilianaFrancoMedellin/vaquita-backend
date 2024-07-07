import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import authSchemaValidation from '../validations/auth.schema.validation.js';
import validateSchema from '../middlewares/validate-schema.middleware.js';

const AuthRouter = () => {
  const authController = AuthController();
  console.log(1, '[User] Router');

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, '[Auth] Routes Registered');

    router.post('/login', validateSchema(authSchemaValidation), authController.login);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { AuthRouter };
