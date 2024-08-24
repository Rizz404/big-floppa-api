import { Request, RequestHandler, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { Cat, CatStatus } from "../entity/Cat.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { sendNotification } from "../sockets/notificationHandler";
import { Notification, NotificationType } from "../entity/Notification.entity";
import { CatBreedFollowed } from "../entity/CatBreedFollowed.entity";
import { In } from "typeorm";
import { Order, OrderStatus } from "../entity/Order.entity";

interface CatQuery extends BaseReqQuery {
  status?: CatStatus;
}

class CatController {
  private catRepostory = myDataSource.getRepository(Cat);
  private catBreedFollowedRepostory =
    myDataSource.getRepository(CatBreedFollowed);
  private orderRepository = myDataSource.getRepository(Order);
  private notificationRepository = myDataSource.getRepository(Notification);

  public createCat = async (req: Request, res: Response) => {
    try {
      const catData: Partial<Cat> = req.body;

      const newCat = this.catRepostory.create(catData);

      await this.catRepostory.save(newCat);

      const userFollowedBreeds = await this.catBreedFollowedRepostory.find({
        where: { catBreed: { id: catData.catBreed?.id } },
        relations: { user: true, catBreed: true },
      });

      console.log(userFollowedBreeds);

      const newCatNotification = this.notificationRepository.create({
        message: "Cat created",
        type: NotificationType.NEW_CAT,
        users: userFollowedBreeds.map((followed) => followed.user),
      });

      await this.notificationRepository.save(newCatNotification);

      sendNotification(req.io, newCatNotification);

      res.status(201).json({ message: "Cat created", data: newCat });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  // public buyCat: RequestHandler = async (req, res) => {
  //   try {
  //     const { id } = req.user!;
  //     const { catId } = req.params;
  //     const { shippingServiceId } = req.body;

  //     const cat = await this.catRepostory.findOne({ where: { id: catId } });

  //     if (!cat) {
  //       return res.status(404).json({ message: "Cat not found" });
  //     }

  //     const createOrder = this.orderRepository.create({
  //       cat,
  //       user: { id },
  //       amount: cat.quantity,
  //       shippingService: { id: shippingServiceId },
  //       status: OrderStatus.PENDING,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: getErrorMessage(error) });
  //   }
  // };

  public getCats = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "desc",
        status = CatStatus.AVAILABLE,
      } = req.query as unknown as CatQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.catRepostory.count({ where: { status } });
      const cats = await this.catRepostory.find({
        where: { status },
        take: +limit,
        skip,
        order: { createdAt: order },
        relations: { user: true, catBreed: true, catPictures: true },
      });

      const response = paginatedResponse(cats, +page, +limit, totalData);
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getCatById = async (req: Request, res: Response) => {
    try {
      const { catId } = req.params;
      const cat = await this.catRepostory.findOne({
        where: { id: catId },
        relations: { user: true, catBreed: true, catPictures: true },
      });

      if (!cat) {
        return res.status(404).json({ message: "Cat not found" });
      }

      res.json(cat);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateCatById = async (req: Request, res: Response) => {
    try {
      const { catId } = req.params;
      const catData: Cat = req.body;

      await this.catRepostory.update(catId, catData);

      const updatedCat = await this.catRepostory.findOne({
        where: { id: catId },
        relations: { user: true, catBreed: true, catPictures: true },
      });

      if (!updatedCat) {
        return res.status(404).json({ message: "Cat not found" });
      }

      res.json({ message: "Cat updated", data: updatedCat });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteCatById = async (req: Request, res: Response) => {
    try {
      const { catId } = req.params;
      const deletedCat = await this.catRepostory.delete(catId);

      res.json({ message: "Cat deleted", data: deletedCat });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new CatController();
