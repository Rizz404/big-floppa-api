import { UserController } from "@/controllers/user.controller";
import express from "express";

const router = express.Router();

router.route("/").post(UserController.createUser);

export { router as userRouter };
