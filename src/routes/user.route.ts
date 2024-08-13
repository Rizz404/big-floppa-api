import { UserController } from "@/controllers/user.controller";
import express from "express";

const router = express.Router();
const userRouter = new UserController();

router
  .route("/")
  .get((req, res) => userRouter.getUsers(req, res))
  .post((req, res) => userRouter.createUser(req, res));
router
  .route("/:userId")
  .get((req, res) => userRouter.getUserById(req, res))
  .patch((req, res) => userRouter.updateUserById(req, res))
  .delete((req, res) => userRouter.deleteUserById(req, res));

export { router as userRouter };
