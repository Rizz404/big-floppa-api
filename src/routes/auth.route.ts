import authController from "@/controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export { router as authRouter };
