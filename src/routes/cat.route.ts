import catController from "../controllers/cat.controller";
import express from "express";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(catController.getCats)
  .post(auth, catController.createCat);
router.post("/buy/:catId", auth, catController.buyCat);
router
  .route("/:catId")
  .get(catController.getCatById)
  .patch(auth, catController.updateCatById)
  .delete(auth, catController.deleteCatById);

export { router as catRouter };
