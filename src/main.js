import express from "express";
import { UserRouter } from "./user/user.router.js";
import { GroupRouter } from "./group/group.router.js";
import { FriendRouter } from "./friend/friend.router.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use("/users", new UserRouter().registerRoutes());
app.use("/groups", new GroupRouter().registerRoutes());
app.use("/friends", new FriendRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
