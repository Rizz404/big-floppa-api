import { CityController } from "@/controllers/city.controller";
import express from "express";

const router = express.Router();
const cityRouter = new CityController();

router
  .route("/")
  .get((req, res) => cityRouter.getCitys(req, res))
  .post((req, res) => cityRouter.createCity(req, res));
router
  .route("/:cityId")
  .get((req, res) => cityRouter.getCityById(req, res))
  .patch((req, res) => cityRouter.updateCityById(req, res))
  .delete((req, res) => cityRouter.deleteCityById(req, res));

export { router as cityRouter };
