import catBreedFollowedController from "../controllers/catBreedFollowed.controller";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import validateDto from "../middleware/dto.validation.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router.get("/", auth, catBreedFollowedController.getCatBreedsFollowed);
router
  .route("/:catBreedId")
  .post(auth, catBreedFollowedController.createCatBreedFollowed)
  .delete(auth, catBreedFollowedController.deleteCatBreedFollowed);

export { router as catBreedsFollowedRouter };
