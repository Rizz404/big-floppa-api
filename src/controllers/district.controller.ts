import { Request, Response } from "express";
import myDataSource from "@/data-source";
import { District } from "@/entity/District.entity";

export class DistrictController {
  private districtRepostory = myDataSource.getRepository(District);

  public async createDistrict(req: Request, res: Response) {
    try {
      const districtData: Partial<District> = req.body;

      const newDistrict = this.districtRepostory.create(districtData);

      await this.districtRepostory.save(newDistrict);

      res.status(201).json({ message: "Cat race created", data: newDistrict });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: error });
    }
  }

  public async getDistricts(req: Request, res: Response) {
    try {
      const districts = await this.districtRepostory.find({
        relations: ["author"],
      });

      res.json(districts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async getDistrictById(req: Request, res: Response) {
    try {
      const { districtId } = req.params;
      const district = await this.districtRepostory.findOne({
        where: { id: districtId },
        relations: ["author"],
      });

      if (!district) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json(district);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateDistrictById(req: Request, res: Response) {
    try {
      const { districtId } = req.params;
      const districtData: District = req.body;

      await this.districtRepostory.update(districtId, districtData);

      const updatedDistrict = await this.districtRepostory.findOne({
        where: { id: districtId },
        relations: ["author"],
      });

      if (!updatedDistrict) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json({ message: "Cat race updated", data: updatedDistrict });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async deleteDistrictById(req: Request, res: Response) {
    try {
      const { districtId } = req.params;
      const deletedDistrict = await this.districtRepostory.delete(districtId);

      res.json({ message: "Cat race deleted", data: deletedDistrict });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
