import { CatRaceController } from "@/controllers/catRace.controller";
import express from "express";

const router = express.Router();
const catRaceRouter = new CatRaceController();

router
  .route("/")
  .get((req, res) => catRaceRouter.getCatRaces(req, res))
  .post((req, res) => catRaceRouter.createCatRace(req, res));
router
  .route("/:catRaceId")
  .get((req, res) => catRaceRouter.getCatRaceById(req, res))
  .patch((req, res) => catRaceRouter.updateCatRaceById(req, res))
  .delete((req, res) => catRaceRouter.deleteCatRaceById(req, res));

export { router as catRaceRouter };
