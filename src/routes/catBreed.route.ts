import catBreedController from "@/controllers/catBreed.controller";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(catBreedController.getCatBreeds)
  .post(catBreedController.createCatBreed);
router
  .route("/:catBreedId")
  .get(catBreedController.getCatBreedById)
  .patch(catBreedController.updateCatBreedById)
  .delete(catBreedController.deleteCatBreedById);

export { router as catBreedRouter };
