import { Request, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { ShippingService } from "../entity/ShippingService.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";

interface BreedQuery extends BaseReqQuery {}

class ShippingServiceController {
  private shippingServiceRepostory =
    myDataSource.getRepository(ShippingService);

  public createShippingService = async (req: Request, res: Response) => {
    try {
      const shippingServiceData: Pick<
        ShippingService,
        "name" | "description" | "fee" | "estimationTime"
      > = req.body;

      const newShippingService =
        this.shippingServiceRepostory.create(shippingServiceData);

      await this.shippingServiceRepostory.save(newShippingService);

      res
        .status(201)
        .json({
          message: "Shipping service created",
          data: newShippingService,
        });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getShippingServices = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as BreedQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.shippingServiceRepostory.count();
      const shippingServices = await this.shippingServiceRepostory.find({
        take: +limit,
        skip,
        order: { createdAt: order },
      });

      const response = paginatedResponse(
        shippingServices,
        +page,
        +limit,
        totalData
      );

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getShippingServiceById = async (req: Request, res: Response) => {
    try {
      const { shippingServiceId } = req.params;
      const shippingService = await this.shippingServiceRepostory.findOne({
        where: { id: shippingServiceId },
      });

      if (!shippingService) {
        return res.status(404).json({ message: "Shipping service not found" });
      }

      res.json(shippingService);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateShippingServiceById = async (req: Request, res: Response) => {
    try {
      const { shippingServiceId } = req.params;
      const shippingServiceData: Pick<
        ShippingService,
        "name" | "description" | "fee" | "estimationTime"
      > = req.body;

      await this.shippingServiceRepostory.update(
        shippingServiceId,
        shippingServiceData
      );

      const updatedShippingService =
        await this.shippingServiceRepostory.findOne({
          where: { id: shippingServiceId },
        });

      if (!updatedShippingService) {
        return res.status(404).json({ message: "Shipping service not found" });
      }

      res.json({
        message: "Shipping service updated",
        data: updatedShippingService,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteShippingServiceById = async (req: Request, res: Response) => {
    try {
      const { shippingServiceId } = req.params;
      const deletedShippingService = await this.shippingServiceRepostory.delete(
        shippingServiceId
      );

      res.json({
        message: "Shipping service deleted",
        data: deletedShippingService,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new ShippingServiceController();
