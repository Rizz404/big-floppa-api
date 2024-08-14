import authController from "@/controllers/auth.controller";
import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/login-local",
  passport.authenticate("local", { failureRedirect: "/login-failed" }),
  (req, res) => {
    res.json({ message: "Login successful", user: req.user });
  }
);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export { router as authRouter };
