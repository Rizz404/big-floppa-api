import userController from "@/controllers/user.controller";
import { UserQueryDto } from "@/dto/user.dto";
import { UserRole } from "@/entity/User.entity";
import { auth } from "@/middleware/auth.middleware";
import validateDto from "@/middleware/dto.validation.middleware";
import roleAccess from "@/middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(
    auth,
    roleAccess(UserRole.ADMIN),
    validateDto("query", UserQueryDto),
    userController.getUsers
  )
  .post(auth, roleAccess(UserRole.ADMIN), userController.createUser);
router
  .route("/profile")
  .get(auth, (req, res) => {
    res.json(req.user);
  })
  .patch(auth, userController.updateUserProfile);
router.patch(
  "/update-role/:userId",
  auth,
  roleAccess(UserRole.ADMIN),
  userController.updateUserRole
);
router.patch(
  "/verify/:userId",
  auth,
  roleAccess(UserRole.ADMIN),
  userController.verifiedUser
);
router.patch("/update-password", auth, userController.updateUserPassword);
router
  .route("/:userId")
  .get(userController.getUserById)
  .delete(auth, roleAccess(UserRole.ADMIN), userController.deleteUserById);

export { router as userRouter };
