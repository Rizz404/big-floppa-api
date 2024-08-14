import { DistrictController } from "@/controllers/district.controller";
import express from "express";

const router = express.Router();
const districtRouter = new DistrictController();

router
  .route("/")
  .get((req, res) => districtRouter.getDistricts(req, res))
  .post((req, res) => districtRouter.createDistrict(req, res));
router
  .route("/:districtId")
  .get((req, res) => districtRouter.getDistrictById(req, res))
  .patch((req, res) => districtRouter.updateDistrictById(req, res))
  .delete((req, res) => districtRouter.deleteDistrictById(req, res));

export { router as districtRouter };
