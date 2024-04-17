import express from 'express';
import { GroupRouter } from './router/group.router.js';

const PORT = process.env.PORT || 3001;
const app = express();

//TEMPORAL TO MOCK SESSION
const mockSession = {
  user: {
    id: 10000,
    name: 'YOUR USER',
    email: 'user@email.com',
  },
};

const sessionMiddleware = (req, res, next) => {
  req.session = mockSession;
  next();
};

app.use(sessionMiddleware);
app.use(express.json());

app.use('/groups', GroupRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
