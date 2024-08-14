import { Request, Response } from "express";
import myDataSource from "@/data-source";
import getErrorMessage from "@/utils/getErrorMessage";
import { Village } from "@/entity/Village.entity";

class VillageController {
  private villageRepostory = myDataSource.getRepository(Village);

  public createVillage = async (req: Request, res: Response) => {
    try {
      const villageData: Partial<Village> = req.body;

      const newVillage = this.villageRepostory.create(villageData);

      await this.villageRepostory.save(newVillage);

      res.status(201).json({ message: "Cat race created", data: newVillage });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getVillages = async (req: Request, res: Response) => {
    try {
      const villages = await this.villageRepostory.find({
        relations: ["author"],
      });

      res.json(villages);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getVillageById = async (req: Request, res: Response) => {
    try {
      const { villageId } = req.params;
      const village = await this.villageRepostory.findOne({
        where: { id: villageId },
        relations: ["author"],
      });

      if (!village) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json(village);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateVillageById = async (req: Request, res: Response) => {
    try {
      const { villageId } = req.params;
      const villageData: Village = req.body;

      await this.villageRepostory.update(villageId, villageData);

      const updatedVillage = await this.villageRepostory.findOne({
        where: { id: villageId },
        relations: ["author"],
      });

      if (!updatedVillage) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json({ message: "Cat race updated", data: updatedVillage });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteVillageById = async (req: Request, res: Response) => {
    try {
      const { villageId } = req.params;
      const deletedVillage = await this.villageRepostory.delete(villageId);

      res.json({ message: "Cat race deleted", data: deletedVillage });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new VillageController();
