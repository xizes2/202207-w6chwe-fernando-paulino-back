import jwt from "jsonwebtoken";
import { JwtPayload } from "../server/types/usersLogin";

export const createToken = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
