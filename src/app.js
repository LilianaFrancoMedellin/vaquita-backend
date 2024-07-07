import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { GroupRouter } from './router/group.router.js';
import { UserRouter } from './router/user.router.js';
import { AuthRouter } from './router/auth.router.js';
import { UserGroupRouter } from './router/user-group.router.js';
import { ExpenseRouter } from './router/expense.router.js';
import { applyJWTAuthentication } from './middlewares/auth.middleware.js';
import './utils/passport.config.js'; // Your Passport configuration

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//auth stuff
app.use(applyJWTAuthentication);

app.use('/groups', GroupRouter().registerRoutes());
app.use('/users', UserRouter().registerRoutes());
app.use('/expenses', ExpenseRouter().registerRoutes());
app.use('/user-group', UserGroupRouter().registerRoutes());
app.use('/auth', AuthRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
