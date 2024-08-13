import { Request, Response } from "express";
import bcrypt from "bcrypt";

import myDataSource from "@/data-source";
import { Cat } from "@/entity/Cat.entity";

export class CatController {
  private catRepostory = myDataSource.getRepository(Cat);

  public async createCat(req: Request, res: Response) {
    try {
      const catData: Partial<Cat> = req.body;

      const newCat = this.catRepostory.create(catData);

      await this.catRepostory.save(newCat);

      res.status(201).json({ message: "Cat created", data: newCat });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: error });
    }
  }

  public async getCats(req: Request, res: Response) {
    try {
      const cats = await this.catRepostory.find({
        relations: ["user", "catPictures", "catRaces"],
      });

      res.json(cats);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async getCatById(req: Request, res: Response) {
    try {
      const { catId } = req.params;
      const cat = await this.catRepostory.findOne({
        where: { id: catId },
        relations: ["user", "catPictures", "catRaces"],
      });

      if (!cat) {
        return res.status(404).json({ message: "Cat not found" });
      }

      res.json(cat);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateCatById(req: Request, res: Response) {
    try {
      const { catId } = req.params;
      const catData: Cat = req.body;

      await this.catRepostory.update(catId, catData);

      const updatedCat = await this.catRepostory.findOne({
        where: { id: catId },
        relations: ["user", "catPictures", "catRaces"],
      });

      if (!updatedCat) {
        return res.status(404).json({ message: "Cat not found" });
      }

      res.json({ message: "Cat updated", data: updatedCat });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async deleteCatById(req: Request, res: Response) {
    try {
      const { catId } = req.params;
      const deletedCat = await this.catRepostory.delete(catId);

      res.json({ message: "Cat deleted", data: deletedCat });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
