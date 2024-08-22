import { RequestHandler } from "express";
import myDataSource from "../config/data-source";
import { CatBreedFollowed } from "../entity/CatBreedFollowed.entity";
import getErrorMessage from "../utils/getErrorMessage";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { CatBreed } from "../entity/CatBreed.entity";
import { In } from "typeorm";

interface CatBreedFollowedQuery extends BaseReqQuery {}

class catBreedFollowedController {
  public catBreedFollowedRepository =
    myDataSource.getRepository(CatBreedFollowed);
  public catBreedRepository = myDataSource.getRepository(CatBreed);

  public createCatBreedFollowed: RequestHandler = async (req, res) => {
    try {
      const { id } = req.user!;
      const { catBreedId } = req.params;

      const newCatBreedFollowed = this.catBreedFollowedRepository.create({
        user: { id },
        catBreed: { id: catBreedId },
      });

      await this.catBreedFollowedRepository.save(newCatBreedFollowed);

      res.json({
        message: "Successfully followed breed",
        data: newCatBreedFollowed,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getCatBreedsFollowed: RequestHandler = async (req, res) => {
    try {
      const { id } = req.user!;
      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as CatBreedFollowedQuery;
      const skip = (+page - 1) * +limit;

      // * Mendapatkan semua CatBreedFollowed oleh user
      const catBreedsFollowed = await this.catBreedFollowedRepository.find({
        where: { user: { id } },
        relations: { catBreed: true },
        select: { catBreed: { id: true } },
      });

      // * Mengambil ID dari CatBreed
      const catBreedIds = catBreedsFollowed.map(
        (followed) => followed.catBreed.id
      );

      if (catBreedIds.length === 0) {
        return res.json(paginatedResponse([], +page, +limit, 0));
      }

      const totalData = await this.catBreedRepository.count({
        where: { id: In(catBreedIds) },
      });

      // todo: Harusnya sorting berdasarkan followednya
      const catBreeds = await this.catBreedRepository.find({
        where: { id: In(catBreedIds) },
        take: +limit,
        skip,
        order: { createdAt: order },
      });

      const response = paginatedResponse(
        catBreeds || [],
        +page,
        +limit,
        totalData
      );
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteCatBreedFollowed: RequestHandler = async (req, res) => {
    try {
      const { id } = req.user!;
      const { catBreedId } = req.params;

      const deletedCatBreedFollowed =
        await this.catBreedFollowedRepository.delete({
          user: { id },
          catBreed: { id: catBreedId },
        });

      res.json({
        message: "Successfully unfollowed breed",
        data: deletedCatBreedFollowed,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new catBreedFollowedController();
