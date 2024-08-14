import profileController from "@/controllers/profile.controller";
import { authenticateJWT } from "@/middleware/auth";
import express from "express";

const router = express.Router();

router
  .route("/")
  .post(authenticateJWT, profileController.createProfile)
  .get(authenticateJWT, profileController.getProfile)
  .patch(authenticateJWT, profileController.updateProfile);

export { router as profileRouter };
