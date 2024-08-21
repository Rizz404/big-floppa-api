import catBreedController from "@/controllers/catBreed.controller";
import {
  BreedQueryDto,
  CreateBreedDto,
  UpdateBreedDto,
} from "@/dto/catbreed.dto";
import { UserRole } from "@/entity/User.entity";
import { auth } from "@/middleware/auth.middleware";
import validateDto from "@/middleware/dto.validation.middleware";
import roleAccess from "@/middleware/role.access.middleware";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(validateDto("query", BreedQueryDto), catBreedController.getCatBreeds)
  .post(
    auth,
    validateDto("body", CreateBreedDto),
    catBreedController.createCatBreed
  );
router
  .route("/:catBreedId")
  .get(catBreedController.getCatBreedById)
  .patch(
    auth,
    roleAccess(UserRole.ADMIN),
    validateDto("body", UpdateBreedDto),
    catBreedController.updateCatBreedById
  )
  .delete(
    auth,
    roleAccess(UserRole.ADMIN),
    catBreedController.deleteCatBreedById
  );

export { router as catBreedRouter };
