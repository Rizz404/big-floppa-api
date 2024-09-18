import orderController from "../controllers/order.controller";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router.route("/").get(auth, orderController.getOrders);
router
  .route("/orderItems/:orderId")
  .patch(auth, orderController.getOrderItemsFromOrderId);
router
  .route("/:orderId")
  .get(auth, orderController.getOrderById)
  .patch(auth, roleAccess(UserRole.ADMIN), orderController.updateOrderById)
  .delete(auth, orderController.deleteOrderById);

export { router as orderRouter };
