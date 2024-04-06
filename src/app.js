import express from "express";
import { GroupRouter } from "./router/group.router.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use("/groups", GroupRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
