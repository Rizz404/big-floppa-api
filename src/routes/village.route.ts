import villageController from "@/controllers/village.controller";
import express from "express";

const router = express.Router();

router
  .route("/")
  .get(villageController.getVillages)
  .post(villageController.createVillage);
router
  .route("/:villageId")
  .get(villageController.getVillageById)
  .patch(villageController.updateVillageById)
  .delete(villageController.deleteVillageById);

export { router as villageRouter };
