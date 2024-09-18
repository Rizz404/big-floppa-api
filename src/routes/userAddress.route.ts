import userAddressController from "../controllers/userAddress.controller";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(userAddressController.getUserAddresss)
  .post(auth, userAddressController.createUserAddress);
router.get("/user", auth, userAddressController.getUserAddressesByUser);
router
  .route("/:userAddressId")
  .get(userAddressController.getUserAddressById)
  .patch(auth, userAddressController.updateUserAddressById)
  .delete(
    auth,
    roleAccess(UserRole.ADMIN),
    userAddressController.deleteUserAddressById
  );

export { router as userAddressRouter };
