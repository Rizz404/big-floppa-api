import shippingServiceController from "../controllers/shippingService.controller";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(shippingServiceController.getShippingServices)
  .post(auth, shippingServiceController.createShippingService);
router
  .route("/:shippingServiceId")
  .get(shippingServiceController.getShippingServiceById)
  .patch(
    auth,
    roleAccess(UserRole.ADMIN),
    shippingServiceController.updateShippingServiceById
  )
  .delete(
    auth,
    roleAccess(UserRole.ADMIN),
    shippingServiceController.deleteShippingServiceById
  );

export { router as shippingServiceRouter };
