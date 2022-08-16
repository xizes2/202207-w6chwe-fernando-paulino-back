import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/auth";
import CustomError from "../types/error";

interface ICustomRequest extends Request {
  payload: JwtPayload;
}

const authentication = (
  req: ICustomRequest,
  res: Response,
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

  req.payload = tokenData as ICustomRequest;
  next();
};

export default authentication;
