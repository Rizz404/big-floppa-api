import { Request, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { CatBreed } from "../entity/CatBreed.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { Notification, NotificationType } from "../entity/Notification.entity";
import { sendNotification } from "../sockets/notificationHandler";
import deleteFile from "../utils/deleteFile";

interface BreedQuery extends BaseReqQuery {}

class CatBreedController {
  private catBreedRepostory = myDataSource.getRepository(CatBreed);
  private notificationRepository = myDataSource.getRepository(Notification);

  public createCatBreed = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const catBreedData: Partial<CatBreed> = req.body;
      const file = req.file;

      const newCatBreed = this.catBreedRepostory.create({
        author: { id },
        ...(file && { image: file.fileUrl }),
        ...catBreedData,
      });

      await this.catBreedRepostory.save(newCatBreed);

      const newBreedNotification = this.notificationRepository.create({
        message: "Breed created",
        type: NotificationType.NEW_BREED,
        isGlobal: true,
      });

      await this.notificationRepository.save(newBreedNotification);

      sendNotification(req.io, newBreedNotification);

      res.status(201).json({ message: "Cat breed created", data: newCatBreed });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getCatBreeds = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as BreedQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.catBreedRepostory.count();
      const catBreeds = await this.catBreedRepostory.find({
        take: +limit,
        skip,
        order: { createdAt: order },
        relations: { author: true },
      });

      const response = paginatedResponse(catBreeds, +page, +limit, totalData);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getCatBreedById = async (req: Request, res: Response) => {
    try {
      const { catBreedId } = req.params;
      const catBreed = await this.catBreedRepostory.findOne({
        where: { id: catBreedId },
        relations: { author: true },
      });

      if (!catBreed) {
        return res.status(404).json({ message: "Cat breed not found" });
      }

      res.json(catBreed);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateCatBreedById = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const { catBreedId } = req.params;
      const file = req.file;
      const catBreedData: Omit<CatBreed, "author"> = req.body;

      await this.catBreedRepostory.update(catBreedId, {
        author: { id },
        ...(file && { image: file.fileUrl }),
        ...catBreedData,
      });

      const updatedCatBreed = await this.catBreedRepostory.findOne({
        where: { id: catBreedId },
        relations: { author: true },
      });

      if (!updatedCatBreed) {
        return res.status(404).json({ message: "Cat breed not found" });
      }

      res.json({ message: "Cat breed updated", data: updatedCatBreed });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteCatBreedById = async (req: Request, res: Response) => {
    try {
      const { catBreedId } = req.params;

      const catBreed = await this.catBreedRepostory.findOne({
        where: { id: catBreedId },
      });

      if (!catBreed) {
        return res.status(404).json({ message: "Cat not found" });
      }

      if (catBreed.image) {
        await deleteFile(catBreed.image);
      }

      const deletedCatBreed = await this.catBreedRepostory.delete(catBreedId);

      res.json({ message: "Cat breed deleted", data: deletedCatBreed });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new CatBreedController();
