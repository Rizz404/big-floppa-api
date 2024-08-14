import provinceController from "@/controllers/province.controller";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(provinceController.getProvinces)
  .post(provinceController.createProvince);
router
  .route("/:provinceId")
  .get(provinceController.getProvinceById)
  .patch(provinceController.updateProvinceById)
  .delete(provinceController.deleteProvinceById);

export { router as provinceRouter };
