import { Request, Response } from "express";
import myDataSource from "@/data-source";
import { CatRace } from "@/entity/CatRace.entity";

export class CatRaceController {
  private catRaceRepostory = myDataSource.getRepository(CatRace);

  public async createCatRace(req: Request, res: Response) {
    try {
      const catRaceData: Partial<CatRace> = req.body;

      const newCatRace = this.catRaceRepostory.create(catRaceData);

      await this.catRaceRepostory.save(newCatRace);

      res.status(201).json({ message: "Cat race created", data: newCatRace });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: error });
    }
  }

  public async getCatRaces(req: Request, res: Response) {
    try {
      const catRaces = await this.catRaceRepostory.find({
        relations: ["author"],
      });

      res.json(catRaces);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async getCatRaceById(req: Request, res: Response) {
    try {
      const { catRaceId } = req.params;
      const catRace = await this.catRaceRepostory.findOne({
        where: { id: catRaceId },
        relations: ["author"],
      });

      if (!catRace) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json(catRace);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateCatRaceById(req: Request, res: Response) {
    try {
      const { catRaceId } = req.params;
      const catRaceData: CatRace = req.body;

      await this.catRaceRepostory.update(catRaceId, catRaceData);

      const updatedCatRace = await this.catRaceRepostory.findOne({
        where: { id: catRaceId },
        relations: ["author"],
      });

      if (!updatedCatRace) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json({ message: "Cat race updated", data: updatedCatRace });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async deleteCatRaceById(req: Request, res: Response) {
    try {
      const { catRaceId } = req.params;
      const deletedCatRace = await this.catRaceRepostory.delete(catRaceId);

      res.json({ message: "Cat race deleted", data: deletedCatRace });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
