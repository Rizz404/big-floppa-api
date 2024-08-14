import { Request, Response } from "express";
import myDataSource from "@/data-source";
import { CatBreed } from "@/entity/CatBreed.entity";

class CatBreedController {
  private catBreedRepostory = myDataSource.getRepository(CatBreed);

  public async createCatBreed(req: Request, res: Response) {
    try {
      const catBreedData: Partial<CatBreed> = req.body;

      const newCatBreed = this.catBreedRepostory.create(catBreedData);

      await this.catBreedRepostory.save(newCatBreed);

      res.status(201).json({ message: "Cat race created", data: newCatBreed });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: error });
    }
  }

  public async getCatBreeds(req: Request, res: Response) {
    try {
      const catBreeds = await this.catBreedRepostory.find({
        relations: ["author"],
      });

      res.json(catBreeds);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async getCatBreedById(req: Request, res: Response) {
    try {
      const { catBreedId } = req.params;
      const catBreed = await this.catBreedRepostory.findOne({
        where: { id: catBreedId },
        relations: ["author"],
      });

      if (!catBreed) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json(catBreed);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateCatBreedById(req: Request, res: Response) {
    try {
      const { catBreedId } = req.params;
      const catBreedData: CatBreed = req.body;

      await this.catBreedRepostory.update(catBreedId, catBreedData);

      const updatedCatBreed = await this.catBreedRepostory.findOne({
        where: { id: catBreedId },
        relations: ["author"],
      });

      if (!updatedCatBreed) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json({ message: "Cat race updated", data: updatedCatBreed });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async deleteCatBreedById(req: Request, res: Response) {
    try {
      const { catBreedId } = req.params;
      const deletedCatBreed = await this.catBreedRepostory.delete(catBreedId);

      res.json({ message: "Cat race deleted", data: deletedCatBreed });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default new CatBreedController();
