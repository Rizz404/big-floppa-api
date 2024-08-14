import countryController from "@/controllers/country.controller";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(countryController.getCountrys)
  .post(countryController.createCountry);
router
  .route("/:countryId")
  .get(countryController.getCountryById)
  .patch(countryController.updateCountryById)
  .delete(countryController.deleteCountryById);

export { router as countryRouter };
