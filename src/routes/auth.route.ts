import authController from "@/controllers/auth.controller";
import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/google",
  passport.authenticate("google", { accessType: "offline", prompt: "consent" })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleOauthLogin
);

router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export { router as authRouter };
