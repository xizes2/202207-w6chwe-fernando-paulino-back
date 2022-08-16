import { NextFunction, Response } from "express";
import createCustomError from "../../utils/errorFunction";
import { verifyToken } from "../../utils/loginFunctions";
import { CustomRequest, JwtPayload } from "../types/usersLogin";

const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const autData = req.get("authorization");
  const error = createCustomError(
    400,
    "Bad Request",
    "Error in authentication"
  );
  if (!autData || !autData.startsWith("Bearer ")) {
    next(error);
    return;
  }
  const token = autData.slice(7);

  const tokenVerification = verifyToken(token);

  if (typeof tokenVerification === "string") {
    next(error);
    return;
  }
  req.payload = tokenVerification as JwtPayload;
  next();
};

export default authentication;
