import "../../dotenv";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";
import CustomError from "../types/error";

const debug = Debug("app-robot:middlewares:error");

export const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorCode = error.code ?? 500;
  const errorMessage =
    error.publicMessage ?? "Something went wrong, please try again";

  debug(chalk.bgRedBright(error.message));

  res.status(errorCode).json({ error: errorMessage });
};
