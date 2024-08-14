import { ProvinceController } from "@/controllers/province.controller";
import express from "express";

const router = express.Router();
const provinceRouter = new ProvinceController();

router
  .route("/")
  .get((req, res) => provinceRouter.getProvinces(req, res))
  .post((req, res) => provinceRouter.createProvince(req, res));
router
  .route("/:provinceId")
  .get((req, res) => provinceRouter.getProvinceById(req, res))
  .patch((req, res) => provinceRouter.updateProvinceById(req, res))
  .delete((req, res) => provinceRouter.deleteProvinceById(req, res));

export { router as provinceRouter };
