import { CatController } from "@/controllers/cat.controller";
import express from "express";

const router = express.Router();
const catRouter = new CatController();

router
  .route("/")
  .get((req, res) => catRouter.getCats(req, res))
  .post((req, res) => catRouter.createCat(req, res));
router
  .route("/:catId")
  .get((req, res) => catRouter.getCatById(req, res))
  .patch((req, res) => catRouter.updateCatById(req, res))
  .delete((req, res) => catRouter.deleteCatById(req, res));

export { router as catRouter };
