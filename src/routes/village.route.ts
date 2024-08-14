import { VillageController } from "@/controllers/village.controller";
import express from "express";

const router = express.Router();
const villageRouter = new VillageController();

router
  .route("/")
  .get((req, res) => villageRouter.getVillages(req, res))
  .post((req, res) => villageRouter.createVillage(req, res));
router
  .route("/:villageId")
  .get((req, res) => villageRouter.getVillageById(req, res))
  .patch((req, res) => villageRouter.updateVillageById(req, res))
  .delete((req, res) => villageRouter.deleteVillageById(req, res));

export { router as villageRouter };
