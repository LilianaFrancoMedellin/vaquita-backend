import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "../models/user.model.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Replace with your JWT secret
  passReqToCallback: true, //<= Important, so that the verify function can accept the req param ie verify(req,payload,done)
};

passport.use(
  new Strategy(options, async function (req, jwt_payload, done) {
    try {
      const user = await UserModel().getById(jwt_payload.id);
      if (user) {
        req.user = user;
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  })
);
