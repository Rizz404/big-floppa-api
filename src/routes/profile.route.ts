import { ProfileController } from "@/controllers/profile.controller";
import express from "express";

const router = express.Router();
const profileRouter = new ProfileController();

router.route("/").post((req, res) => profileRouter.createProfile(req, res));
router
  .route("/:profileId")
  .get((req, res) => profileRouter.getProfile(req, res))
  .patch((req, res) => profileRouter.updateProfile(req, res));

export { router as profileRouter };
