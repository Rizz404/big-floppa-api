import catBreedController from "../controllers/catBreed.controller";
import {
  BreedQueryDto,
  CreateBreedDto,
  UpdateBreedDto,
} from "../dto/catbreed.dto";
import { UserRole } from "../entity/User.entity";
import { auth } from "../middleware/auth.middleware";
import validateDto from "../middleware/dto.validation.middleware";
import roleAccess from "../middleware/role.access.middleware";
import express from "express";
import { uploadSingle } from "../middleware/upload.file.middleware";

const router = express.Router();

router
  .route("/")
  .get(validateDto("query", BreedQueryDto), catBreedController.getCatBreeds)
  .post(
    auth,
    uploadSingle("image", "cat"),
    validateDto("body", CreateBreedDto),
    catBreedController.createCatBreed
  );
router
  .route("/:catBreedId")
  .get(catBreedController.getCatBreedById)
  .patch(
    auth,
    roleAccess(UserRole.ADMIN),
    uploadSingle("image", "cat"),
    validateDto("body", UpdateBreedDto),
    catBreedController.updateCatBreedById
  )
  .delete(
    auth,
    roleAccess(UserRole.ADMIN),
    catBreedController.deleteCatBreedById
  );

export { router as catBreedRouter };
