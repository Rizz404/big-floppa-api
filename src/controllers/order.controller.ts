import { Request, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { Order } from "../entity/Order.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { Notification, NotificationType } from "../entity/Notification.entity";
import { sendNotification } from "../sockets/notificationHandler";
import { OrderItem, OrderItemStatus } from "../entity/OrderItem.entity";
import { FindOneOptions, FindOptionsWhere } from "typeorm";
import { RequestHandler } from "express-serve-static-core";

interface OrderQuery extends BaseReqQuery {}
interface OrderItemQuery extends BaseReqQuery {
  orderStatus?: OrderItemStatus;
}

class OrderController {
  private orderRepostory = myDataSource.getRepository(Order);
  private orderItemRepostory = myDataSource.getRepository(OrderItem);

  public getOrders = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as OrderQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.orderRepostory.count({});
      const orders = await this.orderRepostory.find({
        take: +limit,
        skip,
        relations: {
          orderItems: true,
          user: true,
          userAddress: true,
          transaction: true,
        },
        order: { createdAt: order },
      });

      const response = paginatedResponse(orders, +page, +limit, totalData);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getOrderItemsFromOrderId = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const {
        page = 1,
        limit = 10,
        order = "desc",
        orderStatus,
      } = req.query as unknown as OrderItemQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.orderItemRepostory.count({
        where: {
          order: { id: orderId },
          ...(orderStatus && { status: orderStatus }),
        },
      });
      const orderItems = await this.orderItemRepostory.find({
        where: {
          order: { id: orderId },
          ...(orderStatus && { status: orderStatus }),
        },
        take: +limit,
        skip,
        order: { createdAt: order },
      });

      const response = paginatedResponse(orderItems, +page, +limit, totalData);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getOrderById: RequestHandler = async (req, res) => {
    try {
      const { orderId } = req.params;

      const order = await this.orderRepostory.findOne({
        where: { id: orderId },
        relations: { orderItems: true },
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateOrderById = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const { orderId } = req.params;
      const orderData: Omit<Order, "author"> = req.body;

      await this.orderRepostory.update(orderId, {
        ...orderData,
      });

      const updatedOrder = await this.orderRepostory.findOne({
        where: { id: orderId },
      });

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({ message: "Order updated", data: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteOrderById = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const deletedOrder = await this.orderRepostory.delete(orderId);

      res.json({ message: "Order deleted", data: deletedOrder });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new OrderController();
