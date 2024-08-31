import userController from "../controllers/user.controller";
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  UpdateUserRoleDto,
  UserQueryDto,
} from "../dto/user.dto";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import validateDto from "../middleware/dto.validation.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";
import { uploadSingle } from "../middleware/upload.file.middleware";

const router = express.Router();

router
  .route("/")
  .get(
    auth,
    roleAccess(UserRole.ADMIN),
    validateDto("query", UserQueryDto),
    userController.getUsers
  )
  .post(
    auth,
    roleAccess(UserRole.ADMIN),
    validateDto("body", CreateUserDto),
    userController.createUser
  );
router
  .route("/profile")
  .get(auth, (req, res) => {
    res.json(req.user);
  })
  .patch(
    auth,
    validateDto("body", UpdateUserDto),
    uploadSingle("profilePicture", "user"),
    userController.updateUserProfile
  );
router.patch(
  "/update-role/:userId",
  auth,
  roleAccess(UserRole.ADMIN),
  validateDto("body", UpdateUserRoleDto),
  userController.updateUserRole
);
router.patch(
  "/verify/:userId",
  auth,
  roleAccess(UserRole.ADMIN),
  userController.verifiedUser
);
router.patch(
  "/update-password",
  auth,
  validateDto("body", UpdateUserPasswordDto),
  userController.updateUserPassword
);
router
  .route("/:userId")
  .get(userController.getUserById)
  .delete(auth, roleAccess(UserRole.ADMIN), userController.deleteUserById);

export { router as userRouter };
