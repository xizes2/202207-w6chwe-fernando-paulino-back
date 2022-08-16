import "../dotenv";
import jwt from "jsonwebtoken";

export interface IJwtPayload {
  id: string;
  userName: string;
}

export const createToken = (payload: IJwtPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
