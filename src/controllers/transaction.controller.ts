import { Request, Response } from "express";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { Transaction } from "../entity/Transaction.entity";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";

interface BreedQuery extends BaseReqQuery {}

class TransactionController {
  private transactionRepostory = myDataSource.getRepository(Transaction);

  public getTransactions = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        order = "desc",
      } = req.query as unknown as BreedQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.transactionRepostory.count();
      const transactions = await this.transactionRepostory.find({
        take: +limit,
        skip,
        relations: { buyer: true, seller: true, paymentMethod: true },
        order: { createdAt: order },
      });

      const response = paginatedResponse(
        transactions,
        +page,
        +limit,
        totalData
      );

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getTransactionById = async (req: Request, res: Response) => {
    try {
      const { transactionId } = req.params;
      const transaction = await this.transactionRepostory.findOne({
        where: { id: transactionId },
      });

      if (!transaction) {
        return res.status(404).json({ message: "Payment method not found" });
      }

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateTransactionById = async (req: Request, res: Response) => {
    try {
      const { transactionId } = req.params;
      const transactionData: Pick<Transaction, "status"> = req.body;

      await this.transactionRepostory.update(transactionId, transactionData);

      const updatedTransaction = await this.transactionRepostory.findOne({
        where: { id: transactionId },
      });

      if (!updatedTransaction) {
        return res.status(404).json({ message: "Payment method not found" });
      }

      res.json({
        message: "Payment method updated",
        data: updatedTransaction,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteTransactionById = async (req: Request, res: Response) => {
    try {
      const { transactionId } = req.params;
      const deletedTransaction = await this.transactionRepostory.delete(
        transactionId
      );

      res.json({
        message: "Payment method deleted",
        data: deletedTransaction,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new TransactionController();
