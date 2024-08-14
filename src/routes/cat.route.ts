import catController from "@/controllers/cat.controller";
import express from "express";
import passport from "passport";

const router = express.Router();

router
  .route("/")
  .get(catController.getCats)
  .post(
    passport.authenticate("jwt", { session: false }),
    catController.createCat
  );
router
  .route("/:catId")
  .get(catController.getCatById)
  .patch(catController.updateCatById)
  .delete(catController.deleteCatById);

export { router as catRouter };
