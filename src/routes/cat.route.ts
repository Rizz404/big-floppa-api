import catController from "../controllers/cat.controller";
import express from "express";
import { auth } from "../middleware/auth.middleware";
import { uploadArray } from "../middleware/upload.file.middleware";

const router = express.Router();

router
  .route("/")
  .get(catController.getCats)
  .post(auth, uploadArray("catPictures", 7, "cat"), catController.createCat);
router.post("/buy/:catId", auth, catController.buyCat);
router.post(
  "/pictures/:catId",
  auth,
  uploadArray("catPictures", 7, "cat"),
  catController.addCatPictures
);
router
  .route("/:catId")
  .get(catController.getCatById)
  .patch(auth, catController.updateCatById)
  .delete(auth, catController.deleteCatById);

export { router as catRouter };
