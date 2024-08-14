import { Request, Response } from "express";
import myDataSource from "@/data-source";
import { Country } from "@/entity/Country.entity";

export class CountryController {
  private countryRepostory = myDataSource.getRepository(Country);

  public async createCountry(req: Request, res: Response) {
    try {
      const countryData: Partial<Country> = req.body;

      const newCountry = this.countryRepostory.create(countryData);

      await this.countryRepostory.save(newCountry);

      res.status(201).json({ message: "Cat race created", data: newCountry });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: error });
    }
  }

  public async getCountrys(req: Request, res: Response) {
    try {
      const countrys = await this.countryRepostory.find({
        relations: ["author"],
      });

      res.json(countrys);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async getCountryById(req: Request, res: Response) {
    try {
      const { countryId } = req.params;
      const country = await this.countryRepostory.findOne({
        where: { id: countryId },
        relations: ["author"],
      });

      if (!country) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json(country);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateCountryById(req: Request, res: Response) {
    try {
      const { countryId } = req.params;
      const countryData: Country = req.body;

      await this.countryRepostory.update(countryId, countryData);

      const updatedCountry = await this.countryRepostory.findOne({
        where: { id: countryId },
        relations: ["author"],
      });

      if (!updatedCountry) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json({ message: "Cat race updated", data: updatedCountry });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async deleteCountryById(req: Request, res: Response) {
    try {
      const { countryId } = req.params;
      const deletedCountry = await this.countryRepostory.delete(countryId);

      res.json({ message: "Cat race deleted", data: deletedCountry });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
