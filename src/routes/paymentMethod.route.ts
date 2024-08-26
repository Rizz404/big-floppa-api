import paymentMethodController from "../controllers/paymentMethod.controller";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(paymentMethodController.getPaymentMethods)
  .post(auth, paymentMethodController.createPaymentMethod);
router
  .route("/:paymentMethodId")
  .get(paymentMethodController.getPaymentMethodById)
  .patch(
    auth,
    roleAccess(UserRole.ADMIN),
    paymentMethodController.updatePaymentMethodById
  )
  .delete(
    auth,
    roleAccess(UserRole.ADMIN),
    paymentMethodController.deletePaymentMethodById
  );

export { router as paymentMethodRouter };
