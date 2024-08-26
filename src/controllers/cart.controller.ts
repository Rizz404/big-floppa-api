import { Request, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { Cart } from "../entity/Cart.entity";
import { CartItem } from "../entity/CartItem.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import { Cat } from "../entity/Cat.entity";

interface BreedQuery extends BaseReqQuery {}

class CartController {
  private catRepostory = myDataSource.getRepository(Cat);
  private cartRepostory = myDataSource.getRepository(Cart);
  private cartItemRepostory = myDataSource.getRepository(CartItem);

  public addCartItemToCart = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const { catId, quantity = 1 } = req.body;

      let cart = await this.cartRepostory.findOne({
        where: { user: { id } },
      });

      if (!cart) {
        const newCart = this.cartRepostory.create({ user: { id } });
        cart = await this.cartRepostory.save(newCart);
      }

      const cat = await this.catRepostory.findOne({ where: { id: catId } });

      if (!cat || cat.quantity <= 0) {
        return res.status(404).json({ message: "Cat not found or sold" });
      }

      const newCartItem = this.cartItemRepostory.create({
        cart,
        cat,
        quantity,
      });
      const savedCartItem = await this.cartItemRepostory.save(newCartItem);

      res.json({
        message: "Successfully add cat to cart item",
        data: savedCartItem,
      });
    } catch (error) {
      // todo: Buat type error
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

      console.log(cart);

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
      });

      const response = paginatedResponse(cartItems, +page, +limit, totalData);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  // public getCartById = async (req: Request, res: Response) => {
  //   try {
  //     const { cartItemId } = req.params;
  //     const cart = await this.cartRepostory.findOne({
  //       where: { id: cartItemId },
  //     });

  //     if (!cart) {
  //       return res.status(404).json({ message: "Cart item not found" });
  //     }

  //     res.json(cart);
  //   } catch (error) {
  //     res.status(500).json({ message: getErrorMessage(error) });
  //   }
  // };

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
