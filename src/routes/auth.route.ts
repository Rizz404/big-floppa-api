import authController from "@/controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export { router as authRouter };
