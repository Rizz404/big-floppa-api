import authController from "@/controllers/auth.controller";
import { CreateUserDto, LoginDto } from "@/dto/user.dto";
import validateDto from "@/middleware/dto.validation.middleware";
import express from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/register",
  validateDto("body", CreateUserDto),
  authController.register
);
router.post("/login", validateDto("body", LoginDto), authController.login);
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
