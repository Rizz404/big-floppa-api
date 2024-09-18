import transactionController from "../controllers/transaction.controller";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router.route("/").get(transactionController.getTransactions);
router
  .route("/:transactionId")
  .get(transactionController.getTransactionById)
  .patch(
    auth,
    roleAccess(UserRole.ADMIN),
    transactionController.updateTransactionById
  )
  .delete(
    auth,
    roleAccess(UserRole.ADMIN),
    transactionController.deleteTransactionById
  );

export { router as transactionRouter };
