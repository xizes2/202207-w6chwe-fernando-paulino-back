import "../dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IJwtPayload {
  id: string;
  userName: string;
}

export const createToken = (payload: IJwtPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);

// Estas funciones de bcrypt devuelven promesas, por esto en el punto donde las vaya usar tengo que usarlas con un await
export const hashCreator = (text: string) => bcrypt.hash(text, 10);

export const hashCompare = (text: string, hash: string) =>
  bcrypt.compare(text, hash);
