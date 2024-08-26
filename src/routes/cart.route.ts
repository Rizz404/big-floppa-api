import cartController from "../controllers/cart.controller";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/user")
  .get(auth, cartController.getUserCartItems)
  .post(auth, cartController.addCartItemToCart);
router
  .route("/:cartItemId")
  .patch(auth, cartController.updateCartItemById)
  .delete(auth, cartController.deleteCartItemById);

export { router as cartRouter };
