import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GroupRouter } from "./router/group.router.js";
import { UserRouter } from "./router/user.router.js";
import { UserModel } from "./models/user.model.js";
import "./utils/passport.config.js"; // Your Passport configuration

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(passport.initialize());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel().getByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = { id: user.id };
  // { expiresIn: "1h"}
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({ token });
});

app.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You are authenticated");
  }
);

app.use("/groups", GroupRouter().registerRoutes());
app.use("/users", UserRouter().registerRoutes());

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
