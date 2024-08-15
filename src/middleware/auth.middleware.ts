import { RequestHandler } from "express";
import passport from "passport";

export const auth: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User | undefined) => {
      const { refreshToken } = req.cookies;

      if (err || !user || !refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export const optionalAuth: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User | undefined) => {
      const { refreshToken } = req.cookies;

      if (err) {
        return res.status(500).json({ message: "Authentication error" });
      }
      if (user && refreshToken) {
        req.user = user;
      }
      next();
    }
  )(req, res, next);
};
