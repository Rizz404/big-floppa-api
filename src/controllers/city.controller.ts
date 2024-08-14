import { Request, Response } from "express";
import myDataSource from "@/data-source";
import getErrorMessage from "@/utils/getErrorMessage";
import { City } from "@/entity/City.entity";

class CityController {
  private cityRepostory = myDataSource.getRepository(City);

  public createCity = async (req: Request, res: Response) => {
    try {
      const cityData: Partial<City> = req.body;

      const newCity = this.cityRepostory.create(cityData);

      await this.cityRepostory.save(newCity);

      res.status(201).json({ message: "Cat race created", data: newCity });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getCitys = async (req: Request, res: Response) => {
    try {
      const citys = await this.cityRepostory.find({
        relations: ["author"],
      });

      res.json(citys);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getCityById = async (req: Request, res: Response) => {
    try {
      const { cityId } = req.params;
      const city = await this.cityRepostory.findOne({
        where: { id: cityId },
        relations: ["author"],
      });

      if (!city) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json(city);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateCityById = async (req: Request, res: Response) => {
    try {
      const { cityId } = req.params;
      const cityData: City = req.body;

      await this.cityRepostory.update(cityId, cityData);

      const updatedCity = await this.cityRepostory.findOne({
        where: { id: cityId },
        relations: ["author"],
      });

      if (!updatedCity) {
        return res.status(404).json({ message: "Cat race not found" });
      }

      res.json({ message: "Cat race updated", data: updatedCity });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteCityById = async (req: Request, res: Response) => {
    try {
      const { cityId } = req.params;
      const deletedCity = await this.cityRepostory.delete(cityId);

      res.json({ message: "Cat race deleted", data: deletedCity });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new CityController();
