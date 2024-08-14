import { CatBreedController } from "@/controllers/catBreed.controller";
import express from "express";

const router = express.Router();
const catBreedRouter = new CatBreedController();

router
  .route("/")
  .get((req, res) => catBreedRouter.getCatBreeds(req, res))
  .post((req, res) => catBreedRouter.createCatBreed(req, res));
router
  .route("/:catBreedId")
  .get((req, res) => catBreedRouter.getCatBreedById(req, res))
  .patch((req, res) => catBreedRouter.updateCatBreedById(req, res))
  .delete((req, res) => catBreedRouter.deleteCatBreedById(req, res));

export { router as catBreedRouter };
