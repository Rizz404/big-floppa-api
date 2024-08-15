import profileController from "@/controllers/profile.controller";
import userController from "@/controllers/user.controller";
import { authenticateJWT } from "@/middleware/auth";
import express from "express";

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);
router
  .route("/profile")
  .post(authenticateJWT, profileController.createProfile)
  .get(authenticateJWT, (req, res) => {
    res.json(req.user);
  })
  .patch(authenticateJWT, profileController.updateProfile);
router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

export { router as userRouter };
