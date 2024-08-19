import { RequestHandler } from "express";
import passport from "passport";

export const auth: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User | undefined, info: { message: string }) => {
      const { refreshToken } = req.cookies;

      if (err) {
        return res.status(500).json({ message: "Authentication error" });
      }

      if (!user || !refreshToken) {
        if (info && info.message) {
          return res.status(401).json({ message: info.message });
        }
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
    (err: any, user: Express.User | undefined, info: { message: string }) => {
      const { refreshToken } = req.cookies;

      if (err) {
        return res.status(500).json({ message: "Authentication error" });
      }

      if (user && refreshToken) {
        req.user = user;
      } else if (info && info.message) {
        return res.status(401).json({ message: info.message });
      }

      next();
    }
  )(req, res, next);
};
