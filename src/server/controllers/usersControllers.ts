import { Request, Response } from "express";
import { createToken } from "../../utils/auth";

interface LoginData {
  username: string;
  pasword: string;
}
export const loginUser = (req: Request, res: Response) => {
  const user = req.body as LoginData;
  const payload = {
    id: "kjhh9s879287b2j",
    userName: user.username,
  };
  const responseData = {
    user: {
      token: createToken(payload),
    },
  };
  res.status(200).json(responseData);
};

export default loginUser;
