import profileController from "@/controllers/profile.controller";
import { auth } from "@/middleware/auth.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .post(auth, profileController.createProfile)
  .get(auth, profileController.getProfile)
  .patch(auth, profileController.updateProfile);

export { router as profileRouter };
