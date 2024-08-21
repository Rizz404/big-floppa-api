import getErrorMessage from "../utils/getErrorMessage";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";

const validateDto = (validate: "body" | "query", dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let dtoInstance: unknown[];

      if (validate === "body") {
        dtoInstance = plainToInstance(dtoClass, req.body);
      } else {
        dtoInstance = plainToInstance(dtoClass, req.query);
      }

      await validateOrReject(dtoInstance);
      next();
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
};

export default validateDto;
