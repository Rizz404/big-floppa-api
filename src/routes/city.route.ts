import cityController from "@/controllers/city.controller";
import express from "express";

const router = express.Router();

router.route("/").get(cityController.getCitys).post(cityController.createCity);
router
  .route("/:cityId")
  .get(cityController.getCityById)
  .patch(cityController.updateCityById)
  .delete(cityController.deleteCityById);

export { router as cityRouter };
