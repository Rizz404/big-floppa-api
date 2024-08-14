import districtController from "@/controllers/district.controller";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(districtController.getDistricts)
  .post(districtController.createDistrict);
router
  .route("/:districtId")
  .get(districtController.getDistrictById)
  .patch(districtController.updateDistrictById)
  .delete(districtController.deleteDistrictById);

export { router as districtRouter };
