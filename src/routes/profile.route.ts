import profileController from "@/controllers/profile.controller";
import express from "express";
import passport from "passport";

const router = express.Router();

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    profileController.createProfile
  )
  .get(
    passport.authenticate("jwt", { session: false }),
    profileController.getProfile
  )
  .patch(
    passport.authenticate("jwt", { session: false }),
    profileController.updateProfile
  );

export { router as profileRouter };
