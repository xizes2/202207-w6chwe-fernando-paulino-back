import { Request } from "express";

export interface JwtPayload {
  id: string;
  userName: string;
}

export interface CustomRequest extends Request {
  payload: JwtPayload;
}

export interface LoginData {
  username: string;
  password: string;
}
