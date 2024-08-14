import profileController from "@/controllers/profile.controller";
import userController from "@/controllers/user.controller";
import express from "express";
import passport from "passport";

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);
router
  .route("/profile")
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
router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

export { router as userRouter };
