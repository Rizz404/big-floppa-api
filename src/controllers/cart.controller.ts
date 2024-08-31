import { Request, RequestHandler, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { Cart } from "../entity/Cart.entity";
import { CartItem } from "../entity/CartItem.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { Cat } from "../entity/Cat.entity";
import { Order } from "../entity/Order.entity";
import { OrderItem, OrderItemStatus } from "../entity/OrderItem.entity";
import { UserAddress } from "../entity/UserAddress.entity";
import { PaymentMethod } from "../entity/PaymentMethod.entity";
import { PaymentStatus } from "../entity/Transaction.entity";
import { ShippingService } from "../entity/ShippingService.entity";

interface BreedQuery extends BaseReqQuery {}

class CartController {
  private catRepostory = myDataSource.getRepository(Cat);
  private cartRepostory = myDataSource.getRepository(Cart);
  private cartItemRepostory = myDataSource.getRepository(CartItem);

  public addCartItemToCart = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const { catId, quantity = 1 } = req.body;

      let cart =
        (await this.cartRepostory.findOne({
          where: { user: { id } },
        })) ||
        (await this.cartRepostory.save(
          this.cartRepostory.create({ user: { id } })
        ));

      const cat = await this.catRepostory.findOne({ where: { id: catId } });

      if (!cat || cat.quantity <= 0) {
        return res.status(404).json({ message: "Cat not found or sold" });
      }

      const existCartItem = await this.cartItemRepostory.findOne({
        where: { cart: { id: cart.id }, cat: { id: catId } },
      });

      if (existCartItem) {
        const updatedQuantity = Math.min(
          existCartItem.quantity + quantity,
          cat.quantity
        );
        await this.cartItemRepostory.update(existCartItem.id, {
          quantity: updatedQuantity,
        });
        res.json({ message: "Successfully updated cart item" });
      } else {
        const newCartItem = this.cartItemRepostory.create({
          cart,
          cat,
          quantity,
        });
        const savedCartItem = await this.cartItemRepostory.save(newCartItem);

        res.json({
          message: "Successfully added cat to cart item",
          data: savedCartItem,
        });
      }
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public cartCheckout: RequestHandler = async (req, res) => {
    try {
      const { id } = req.user!;
      const {
        paymentMethodId,
        selectedCartItemIds,
        shippingServiceIds,
      }: {
        paymentMethodId: string;
        selectedCartItemIds: string[];
        shippingServiceIds: string[];
      } = req.body;

      const createOrderFromCart = await myDataSource.transaction(async (tx) => {
        const cart = await tx.findOne(Cart, {
          where: { user: { id } },
          relations: { cartItems: { cat: true } },
        });

        if (!cart || cart.cartItems.length < 0) {
          return res.status(400).json({ message: "No cart or carts item" });
        }

        const selectedCartItems = cart.cartItems.filter((cartItem) =>
          selectedCartItemIds.includes(cartItem.id)
        );

        if (selectedCartItems.length === 0) {
          return res
            .status(400)
            .json({ message: "No cart items selected for checkout" });
        }

        let orderItems: OrderItem[] = [];

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

        for (let i = 0; i < selectedCartItems.length; i++) {
          const cartItem = selectedCartItems[i];
          const shippingService = await tx.findOne(ShippingService, {
            where: { id: shippingServiceIds[i] },
          });

          if (!shippingService) {
            return res.status(404).json({
              message: `Shipping service not found for item ${cartItem.id}`,
            });
          }

          const orderItem = tx.create(OrderItem, {
            cat: cartItem.cat,
            amount: cartItem.quantity,
            price: cartItem.cat.price,
            shippingService: shippingService,
            status: OrderItemStatus.PENDING,
          });

          orderItems.push(orderItem);
        }

        const adminFee = 1000;
        const subTotal = orderItems.reduce(
          (total, item) => total + item.price * item.amount,
          0
        );
        const shippingServiceFee = orderItems.reduce(
          (total, item) => total + item.shippingService.fee,
          0
        );
        const total =
          subTotal + shippingServiceFee + adminFee + paymentMethod.paymentFee;

        const newOrder = tx.create(Order, {
          user: { id },
          orderItems,
          transaction: {
            buyer: { id },
            subTotal,
            total,
            paymentMethod,
            paymentMethodFee: paymentMethod.paymentFee,
            shippingServiceFee,
            adminFee,
            status: PaymentStatus.PENDING,
          },
          userAddress,
        });

        await tx.save(Order, newOrder);
        return newOrder;
      });

      res.json({ message: "All Cats ordered", data: createOrderFromCart });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUserCartItems = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      let cart = await this.cartRepostory.findOne({
        where: { user: { id } },
      });

      if (!cart) {
        const newCart = this.cartRepostory.create({ user: { id } });
        cart = await this.cartRepostory.save(newCart);
      }

      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as BreedQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.cartItemRepostory.count({
        where: { cart: { id: cart.id } },
      });
      const cartItems = await this.cartItemRepostory.find({
        where: { cart: { id: cart.id } },
        take: +limit,
        skip,
        order: { createdAt: order },
        relations: { cat: { catPictures: true } },
      });

      const response = paginatedResponse(cartItems, +page, +limit, totalData);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateCartItemById = async (req: Request, res: Response) => {
    try {
      const { cartItemId } = req.params;
      const cartItemData: Pick<CartItem, "quantity"> = req.body;

      await this.cartItemRepostory.update(cartItemId, cartItemData);

      const updatedCartItem = await this.cartItemRepostory.findOne({
        where: { id: cartItemId },
      });

      if (!updatedCartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json({
        message: "Cart item updated",
        data: updatedCartItem,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteCartItemById = async (req: Request, res: Response) => {
    try {
      const { cartItemId } = req.params;
      const deletedCartItem = await this.cartItemRepostory.delete(cartItemId);

      res.json({
        message: "Cart item deleted",
        data: deletedCartItem,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new CartController();
