import { NextFunction, Request, Response } from "express";
import { IJwtPayload, verifyToken } from "../../utils/auth";
import CreateCustomError from "../../utils/CreateCustomError";
import CustomError from "../types/error";

export interface ICustomRequest extends Request {
  payload: IJwtPayload;
}

const authentication = (
  req: ICustomRequest,
  _res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authorization");

  const error: CustomError = CreateCustomError(
    400,
    "Missing user authentication",
    "Authentication error"
  );

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer ")) {
    next(error);
    return;
  }
  const token = dataAuthentication.slice(7);
  const tokenData = verifyToken(token);

  if (typeof tokenData === "string") {
    next(error);
    return;
  }

  req.payload = tokenData as IJwtPayload;
  next();
};

export default authentication;
