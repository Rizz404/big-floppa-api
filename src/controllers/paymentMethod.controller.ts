import { Request, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { PaymentMethod } from "../entity/PaymentMethod.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { sendNotification } from "../sockets/notificationHandler";

interface BreedQuery extends BaseReqQuery {}

class PaymentMethodController {
  private paymentMethodRepostory = myDataSource.getRepository(PaymentMethod);

  public createPaymentMethod = async (req: Request, res: Response) => {
    try {
      const paymentMethodData: Pick<
        PaymentMethod,
        "name" | "description" | "paymentFee"
      > = req.body;

      const newPaymentMethod =
        this.paymentMethodRepostory.create(paymentMethodData);

      await this.paymentMethodRepostory.save(newPaymentMethod);

      res
        .status(201)
        .json({ message: "Payment method created", data: newPaymentMethod });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getPaymentMethods = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as BreedQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.paymentMethodRepostory.count();
      const paymentMethods = await this.paymentMethodRepostory.find({
        take: +limit,
        skip,
        order: { createdAt: order },
      });

      const response = paginatedResponse(
        paymentMethods,
        +page,
        +limit,
        totalData
      );

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getPaymentMethodById = async (req: Request, res: Response) => {
    try {
      const { paymentMethodId } = req.params;
      const paymentMethod = await this.paymentMethodRepostory.findOne({
        where: { id: paymentMethodId },
      });

      if (!paymentMethod) {
        return res.status(404).json({ message: "Payment method not found" });
      }

      res.json(paymentMethod);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updatePaymentMethodById = async (req: Request, res: Response) => {
    try {
      const { paymentMethodId } = req.params;
      const paymentMethodData: Pick<
        PaymentMethod,
        "name" | "description" | "paymentFee"
      > = req.body;

      await this.paymentMethodRepostory.update(
        paymentMethodId,
        paymentMethodData
      );

      const updatedPaymentMethod = await this.paymentMethodRepostory.findOne({
        where: { id: paymentMethodId },
      });

      if (!updatedPaymentMethod) {
        return res.status(404).json({ message: "Payment method not found" });
      }

      res.json({
        message: "Payment method updated",
        data: updatedPaymentMethod,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deletePaymentMethodById = async (req: Request, res: Response) => {
    try {
      const { paymentMethodId } = req.params;
      const deletedPaymentMethod = await this.paymentMethodRepostory.delete(
        paymentMethodId
      );

      res.json({
        message: "Payment method deleted",
        data: deletedPaymentMethod,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new PaymentMethodController();
