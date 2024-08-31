import { Request, RequestHandler, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { Cat, CatStatus } from "../entity/Cat.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { sendNotification } from "../sockets/notificationHandler";
import { Notification, NotificationType } from "../entity/Notification.entity";
import { CatBreedFollowed } from "../entity/CatBreedFollowed.entity";
import { EntityTarget, In, ObjectLiteral } from "typeorm";
import { Order } from "../entity/Order.entity";
import { OrderItem, OrderItemStatus } from "../entity/OrderItem.entity";
import { ShippingService } from "../entity/ShippingService.entity";
import { PaymentStatus } from "../entity/Transaction.entity";
import { PaymentMethod } from "../entity/PaymentMethod.entity";
import { UserAddress } from "../entity/UserAddress.entity";
import { CatPicture } from "../entity/CatPicture.entity";

interface CatQuery extends BaseReqQuery {
  status?: CatStatus;
}

class CatController {
  private repository = <T extends ObjectLiteral>(target: EntityTarget<T>) => {
    return myDataSource.getRepository<T>(target);
  };
  private catRepostory = myDataSource.getRepository(Cat);
  private catBreedFollowedRepostory =
    myDataSource.getRepository(CatBreedFollowed);
  private notificationRepository = myDataSource.getRepository(Notification);

  public createCat = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const catData: Partial<Cat> = req.body;
      const files = req.files as Express.Multer.File[];
      const catPictures = files?.map(
        ({
          mimetype,
          originalname,
          path,
          size,
          filename,
          destination,
          fieldname,
          fileUrl,
        }): Partial<CatPicture> => ({
          mimetype,
          originalname,
          path,
          size,
          url: fileUrl,
          destination,
          fieldname,
          filename,
        })
      );

      const newCat = this.catRepostory.create({
        user: { id },
        ...(files && files.length !== 0 && { catPictures }),
        ...catData,
      });

      await this.catRepostory.save(newCat);

      const userFollowedBreeds = await this.catBreedFollowedRepostory.find({
        where: { catBreed: { id: catData.catBreed?.id } },
        relations: { user: true, catBreed: true },
      });

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

  public buyCat: RequestHandler = async (req, res) => {
    try {
      const { id } = req.user!;
      const { catId } = req.params;
      const { shippingServiceId, paymentMethodId, amount = 1 } = req.body;

      const createOrder = await myDataSource.transaction(async (tx) => {
        const cat = await tx.findOne(Cat, {
          where: { id: catId },
          relations: { user: true },
        });

        if (!cat) {
          return res.status(404).json({ message: "Cat not found" });
        }

        if (amount > cat.quantity) {
          return res
            .status(400)
            .json({ message: "Amount can't greater than quantity of cat" });
        }

        const shippingService = await tx.findOne(ShippingService, {
          where: { id: shippingServiceId },
        });

        if (!shippingService) {
          return res
            .status(404)
            .json({ message: "Shipping service not found" });
        }

        const paymentMethod = await tx.findOne(PaymentMethod, {
          where: { id: paymentMethodId },
        });

        if (!paymentMethod) {
          return res.status(404).json({ message: "Payment method not found" });
        }

        const userAddress = await tx.findOne(UserAddress, {
          where: { user: { id }, isPrimaryAddress: true },
        });

        if (!userAddress) {
          return res
            .status(404)
            .json({ message: "User address must be filled first" });
        }

        const orderItem = tx.create(OrderItem, {
          cat,
          amount,
          price: cat.price,
          shippingService,
          status: OrderItemStatus.PENDING,
        });

        console.log("Calculated total:", {
          subtotal: cat.price * amount,
          adminFee: 1000,
          paymentMethodFee: paymentMethod.paymentFee,
          shippingServiceFee: shippingService.fee,
        });

        const newOrder = tx.create(Order, {
          user: { id },
          orderItems: [orderItem],
          transaction: {
            buyer: { id },
            seller: { id: cat.user.id },
            subTotal: cat.price * amount,
            total:
              cat.price * amount +
              1000 +
              paymentMethod.paymentFee +
              shippingService.fee,
            paymentMethod,
            paymentMethodFee: paymentMethod.paymentFee,
            shippingServiceFee: shippingService.fee,
            adminFee: 1000,
            status: PaymentStatus.PENDING,
          },
          userAddress,
        });

        await tx.save(Order, newOrder);
        return newOrder;
      });
      res.json({ message: "Cat ordered", data: createOrder });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

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
        select: {
          user: {
            id: true,
            username: true,
            email: true,
            profile: { profilePicture: true },
          },
          catBreed: { id: true, name: true, description: true, image: true },
          catPictures: { url: true },
        },
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
        select: {
          user: {
            id: true,
            username: true,
            email: true,
            profile: { profilePicture: true },
          },
          catBreed: { id: true, name: true, description: true, image: true },
          catPictures: { url: true },
        },
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
        select: {
          user: {
            id: true,
            username: true,
            email: true,
            profile: { profilePicture: true },
          },
          catBreed: { id: true, name: true, description: true, image: true },
          catPictures: { url: true },
        },
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
