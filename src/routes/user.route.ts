import profileController from "@/controllers/profile.controller";
import userController from "@/controllers/user.controller";
import { UserRole } from "@/entity/User.entity";
import { auth } from "@/middleware/auth.middleware";
import roleAccess from "@/middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(auth, roleAccess(UserRole.ADMIN), userController.getUsers)
  .post(userController.createUser);
router
  .route("/profile")
  .post(auth, profileController.createProfile)
  .get(auth, (req, res) => {
    res.json(req.user);
  })
  .patch(auth, profileController.updateProfile);
router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

export { router as userRouter };
