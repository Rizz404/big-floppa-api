import { Request, Response } from "express";
import myDataSource from "@/data-source";
import getErrorMessage from "@/utils/getErrorMessage";
import { Province } from "@/entity/Province.entity";

class ProvinceController {
  private provinceRepostory = myDataSource.getRepository(Province);

  public createProvince = async (req: Request, res: Response) => {
    try {
      const provinceData: Partial<Province> = req.body;

      const newProvince = this.provinceRepostory.create(provinceData);

      await this.provinceRepostory.save(newProvince);

      res.status(201).json({ message: "Cat race created", data: newProvince });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getProvinces = async (req: Request, res: Response) => {
    try {
      const provinces = await this.provinceRepostory.find({
        relations: ["author"],
      });

      res.json(provinces);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getProvinceById = async (req: Request, res: Response) => {
    try {
      const { provinceId } = req.params;
      const province = await this.provinceRepostory.findOne({
        where: { id: provinceId },
        relations: ["author"],
      });

      if (!province) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json(province);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateProvinceById = async (req: Request, res: Response) => {
    try {
      const { provinceId } = req.params;
      const provinceData: Province = req.body;

      await this.provinceRepostory.update(provinceId, provinceData);

      const updatedProvince = await this.provinceRepostory.findOne({
        where: { id: provinceId },
        relations: ["author"],
      });

      if (!updatedProvince) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json({ message: "Cat race updated", data: updatedProvince });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteProvinceById = async (req: Request, res: Response) => {
    try {
      const { provinceId } = req.params;
      const deletedProvince = await this.provinceRepostory.delete(provinceId);

      res.json({ message: "Cat race deleted", data: deletedProvince });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new ProvinceController();
