import express from "express";
import { UserRouter } from "./router/user.router.js";
import { GroupRouter } from "./router/group.router.js";
import { FriendRouter } from "./router/friend.router.js";

const PORT = process.env.PORT || 3001;
const app = express();

console.log(0, "root");

app.use("/users", UserRouter().registerRoutes());
app.use("/groups", GroupRouter().registerRoutes());
app.use("/friends", FriendRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
