import { RequestHandler } from "express";
import passport from "passport";

export const authenticateLocal: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateJWT: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User | undefined) => {
      if (err || !user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
