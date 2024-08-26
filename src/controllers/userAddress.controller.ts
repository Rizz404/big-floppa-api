import { Request, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { UserAddress } from "../entity/UserAddress.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";

interface BreedQuery extends BaseReqQuery {}

class UserAddressController {
  private userAddressRepostory = myDataSource.getRepository(UserAddress);

  public createUserAddress = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const userAddressData: Omit<
        UserAddress,
        "createdAt" | "updatedAt" | "id" | "orders" | "user"
      > = req.body;

      const newUserAddress = this.userAddressRepostory.create({
        ...userAddressData,
        user: { id },
        isPrimaryAddress:
          typeof userAddressData.isPrimaryAddress === "string"
            ? !!userAddressData.isPrimaryAddress
            : userAddressData.isPrimaryAddress,
      });

      await this.userAddressRepostory.save(newUserAddress);

      res.status(201).json({
        message: "Shipping service created",
        data: newUserAddress,
      });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUserAddresss = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as BreedQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.userAddressRepostory.count();
      const userAddresss = await this.userAddressRepostory.find({
        take: +limit,
        skip,
        order: { createdAt: order },
      });

      const response = paginatedResponse(
        userAddresss,
        +page,
        +limit,
        totalData
      );

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUserAddressById = async (req: Request, res: Response) => {
    try {
      const { userAddressId } = req.params;
      const userAddress = await this.userAddressRepostory.findOne({
        where: { id: userAddressId },
      });

      if (!userAddress) {
        return res.status(404).json({ message: "Shipping service not found" });
      }

      res.json(userAddress);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateUserAddressById = async (req: Request, res: Response) => {
    try {
      const { userAddressId } = req.params;
      const userAddressData: Omit<
        UserAddress,
        "createdAt" | "updatedAt" | "id" | "orders" | "user"
      > = req.body;

      await this.userAddressRepostory.update(userAddressId, userAddressData);

      const updatedUserAddress = await this.userAddressRepostory.findOne({
        where: { id: userAddressId },
      });

      if (!updatedUserAddress) {
        return res.status(404).json({ message: "Shipping service not found" });
      }

      res.json({
        message: "Shipping service updated",
        data: updatedUserAddress,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteUserAddressById = async (req: Request, res: Response) => {
    try {
      const { userAddressId } = req.params;
      const deletedUserAddress = await this.userAddressRepostory.delete(
        userAddressId
      );

      res.json({
        message: "Shipping service deleted",
        data: deletedUserAddress,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new UserAddressController();
