import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "../models/user.model.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Replace with your JWT secret
};

passport.use(
  new Strategy(options, function (jwt_payload, done) {
    try {
      const user = UserModel().getById(jwt_payload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  })
);
