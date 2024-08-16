import userController from "@/controllers/user.controller";
import { UserRole } from "@/entity/User.entity";
import { auth } from "@/middleware/auth.middleware";
import roleAccess from "@/middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(auth, roleAccess(UserRole.ADMIN), userController.getUsers)
  .post(auth, roleAccess(UserRole.ADMIN), userController.createUser);
router
  .route("/profile")
  .get(auth, (req, res) => {
    res.json(req.user);
  })
  .patch(auth, userController.updateUserProfile);
router.patch("/update-password", auth, userController.updateUserPassword);
router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(auth, roleAccess(UserRole.ADMIN), userController.updateUserById)
  .delete(auth, roleAccess(UserRole.ADMIN), userController.deleteUserById);

export { router as userRouter };
