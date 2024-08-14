import { CountryController } from "@/controllers/country.controller";
import express from "express";

const router = express.Router();
const countryRouter = new CountryController();

router
  .route("/")
  .get((req, res) => countryRouter.getCountrys(req, res))
  .post((req, res) => countryRouter.createCountry(req, res));
router
  .route("/:countryId")
  .get((req, res) => countryRouter.getCountryById(req, res))
  .patch((req, res) => countryRouter.updateCountryById(req, res))
  .delete((req, res) => countryRouter.deleteCountryById(req, res));

export { router as countryRouter };
